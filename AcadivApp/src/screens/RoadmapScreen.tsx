import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RoadmapStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
}

export default function RoadmapScreen({ route, navigation }: any) {
  // 1. ALL HOOKS STRICTLY AT THE TOP LEVEL
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Safe variable extractions
  const selectedField = route?.params?.selectedField || 'Software Engineering';
  const city = route?.params?.city || 'Karachi';

  useEffect(() => {
    fetchRoadmapData();
  }, [selectedField]);

  const fetchRoadmapData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/roadmap?field=${encodeURIComponent(selectedField)}`
      );

      const textResponse = await response.text();

      if (textResponse && textResponse.trim().startsWith('<')) {
        setSteps(getFallbackRoadmap(selectedField));
        setLoading(false);
        return;
      }

      const result = JSON.parse(textResponse);

      if (result && result.success && Array.isArray(result.data)) {
        setSteps(result.data);
      } else {
        setSteps(getFallbackRoadmap(selectedField));
      }
    } catch (error) {
      setSteps(getFallbackRoadmap(selectedField));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackRoadmap = (field: string): RoadmapStep[] => {
    const fieldName = typeof field === 'string' ? field : 'Software Engineering';
    return [
      {
        stepNumber: 1,
        title: 'Matriculation / Basic Foundations',
        description: 'Complete Science/Computer basics with a strong focus on Mathematics and English.',
        duration: 'Grade 9 - 10',
      },
      {
        stepNumber: 2,
        title: `Intermediate / Diploma`,
        description: `Enroll in FSc Pre-Engineering, ICS, or relevant diplomas in ${city}.`,
        duration: '2 Years',
      },
      {
        stepNumber: 3,
        title: 'Entry Test & Skill Preparation',
        description: 'Prepare for entry tests and build core technical & analytical skills.',
        duration: '3 - 6 Months',
      },
      {
        stepNumber: 4,
        title: `Bachelor's Degree in ${fieldName}`,
        description: `Secure admission in top accredited universities offering this degree.`,
        duration: '4 Years',
      },
      {
        stepNumber: 5,
        title: 'Internships & Professional Career',
        description: 'Build real-world projects, secure industry internships, and launch your career.',
        duration: 'Ongoing',
      },
    ];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Roadmap</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Subheader Summary */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Target Field</Text>
          <Text style={styles.infoHighlight}>{selectedField}</Text>
          <Text style={styles.infoSubtext}>Step-by-step guidance for students in {city}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.timelineContainer}>
            {Array.isArray(steps) && steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                {/* Visual Timeline Marker */}
                <View style={styles.markerContainer}>
                  <View style={styles.circle}>
                    <Text style={styles.circleText}>{step.stepNumber || index + 1}</Text>
                  </View>
                  {index !== steps.length - 1 && <View style={styles.line} />}
                </View>

                {/* Content Card */}
                <View style={styles.stepCard}>
                  {step.duration && <Text style={styles.durationTag}>{step.duration}</Text>}
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Clean light background matching dashboard
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  scrollContent: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  infoTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  infoHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 13,
    color: '#444',
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  markerContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#CBD5E1',
    marginTop: 4,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  durationTag: {
    fontSize: 11,
    color: '#007BFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
});