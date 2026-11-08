import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getLoggedInUser, setLoggedInUser } from '../utils/globalUser';

// API URL (adb reverse configured)
const API_URL = 'http://localhost:5000/api/auth';

type Scores = {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
};

// General & Behavioral Questions
const QUESTIONS = [
  { question: 'Do you prefer fixing physical things, gadgets, or building items with your hands?', category: 'R' },
  { question: 'Do you enjoy analyzing how things work and figuring out puzzles or logic problems?', category: 'I' },
  { question: 'Do you like expressing your ideas through visuals, art, layouts, or imaginative projects?', category: 'A' },
  { question: 'Do you feel happy when you guide, teach, or help people solve their personal problems?', category: 'S' },
  { question: 'Do you naturally take charge of groups, pitch ideas, or organize team activities?', category: 'E' },
  { question: 'Do you prefer keeping things well-documented, orderly, and structured according to rules?', category: 'C' },
  { question: 'Would you rather work in a workshop or lab setting than sit in a standard office?', category: 'R' },
  { question: 'Do you love researching deep topics just to satisfy your curiosity about how the world works?', category: 'I' },
  { question: 'Do you find yourself drawn to aesthetic designs, styling, or creating unique concepts?', category: 'A' },
  { question: 'Are you often the person friends come to for emotional support or guidance?', category: 'S' },
  { question: 'Do you enjoy setting goals, managing projects, and persuading others to join a plan?', category: 'E' },
  { question: 'Do you like handling records, checking details carefully, and keeping track of numbers or files?', category: 'C' },
];

const FIELD_MAPPING: Record<string, string> = {
  R: 'Software Engineering',
  I: 'Mobile App Development',
  A: 'Artificial Intelligence & Data Science',
  S: 'Psychology & Social Work',
  E: 'UI/UX Design',
  C: 'Commerce & Accounting',
};

const RiasecScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Get user safely from route params or global storage
  const currentUser = route.params?.user || getLoggedInUser();
  const city = route.params?.city || currentUser?.city || 'Karachi';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<Scores>({
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  });

  const handleAnswer = (answerType: 'yes' | 'no') => {
    const currentQuestion = QUESTIONS[currentIndex];

    const updatedScores: Scores = {
      ...scores,
      [currentQuestion.category]:
        scores[currentQuestion.category as keyof Scores] +
        (answerType === 'yes' ? 1 : 0),
    };

    setScores(updatedScores);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResultAndNavigate(updatedScores);
    }
  };

  const calculateResultAndNavigate = async (finalScores: Scores) => {
    const categories = Object.keys(finalScores) as (keyof Scores)[];

    const topCategory = categories.reduce((best, current) =>
      finalScores[current] > finalScores[best] ? current : best
    );

    const selectedField =
      FIELD_MAPPING[topCategory] || 'Software Engineering';

    const userId = currentUser?._id || currentUser?.id;

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }

    setLoading(true);

    try {
      console.log('Updating profile for user ID:', userId);

      const response = await fetch(
        `${API_URL}/update-profile/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedField: selectedField,
            hasCompletedTest: true,
          }),
        }
      );

      const result = await response.json();
      console.log('Update Profile Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile on server');
      }

      const updatedUser = {
        ...currentUser,
        ...(result?.user || {}),
        selectedField: selectedField,
        hasCompletedTest: true,
      };

      setLoggedInUser(updatedUser);

      navigation.navigate('Result', {
        user: updatedUser,
        city: city,
        selectedField,
        riasecScores: finalScores,
      });

    } catch (error) {
      console.log('RIASEC Backend Update Error:', error);

      // Fallback update locally so app doesn't break
      const updatedUser = {
        ...currentUser,
        selectedField: selectedField,
        hasCompletedTest: true,
      };

      setLoggedInUser(updatedUser);

      navigation.navigate('Result', {
        user: updatedUser,
        city: city,
        selectedField,
        riasecScores: finalScores,
      });
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Analyzing your personality & results...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Interest Assessment</Text>

        <Text style={styles.subtitle}>
          Answer honestly based on what you naturally enjoy doing.
        </Text>

        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { width: `${progress}%` }]}
          />
        </View>

        <Text style={styles.questionNumber}>
          Question {currentIndex + 1} of {QUESTIONS.length}
        </Text>

        <View style={styles.questionCard}>
          <Text style={styles.question}>
            {currentQuestion.question}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.yesButton}
          onPress={() => handleAnswer('yes')}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.noButton}
          onPress={() => handleAnswer('no')}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RiasecScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  progressContainer: {
    height: 9,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: 9,
    backgroundColor: '#2563EB',
    borderRadius: 10,
  },
  questionNumber: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderRadius: 16,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 30,
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 32,
  },
  yesButton: {
    backgroundColor: '#2563EB',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  noButton: {
    backgroundColor: '#64748B',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});