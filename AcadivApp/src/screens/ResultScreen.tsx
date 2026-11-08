import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultScreen({ route, navigation }: any) {
  const {
    user,
    city,
    selectedField,
    riasecScores,
  } = route.params || {};

  const scores = riasecScores || {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  const categories = [
    { key: 'R', name: 'Realistic', description: 'Practical and hands-on interests.' },
    { key: 'I', name: 'Investigative', description: 'Research, science and problem-solving interests.' },
    { key: 'A', name: 'Artistic', description: 'Creative and artistic interests.' },
    { key: 'S', name: 'Social', description: 'Helping, teaching and supporting people.' },
    { key: 'E', name: 'Enterprising', description: 'Leadership and business interests.' },
    { key: 'C', name: 'Conventional', description: 'Organization and data-related interests.' },
  ];

  const highestCategory = categories.reduce((best, current) => {
    return scores[current.key] > scores[best.key] ? current : best;
  }, categories[0]);

  // RiasecScreen se jo selectedField aayi hai, seedha wohi use karein (Purani mapping khatam)
  const finalSelectedField =
    selectedField || 'Software Engineering';

  const handleGoToDashboard = () => {
    navigation.navigate('Dashboard', {
      user: {
        ...(user || {}),
        selectedField: finalSelectedField,
        city: city || user?.city || 'Karachi',
      },
      city: city || user?.city || 'Karachi',
      selectedField: finalSelectedField,
      riasecScores: scores,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.heading}>Assessment Completed!</Text>

        <Text style={styles.subtitle}>
          Your RIASEC career assessment result is ready.
        </Text>

        {/* Main Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>🎉</Text>

          <Text style={styles.resultLabel}>
            Your Dominant Interest Type
          </Text>

          <Text style={styles.categoryName}>
            {highestCategory.name}
          </Text>

          <Text style={styles.description}>
            {highestCategory.description}
          </Text>
        </View>

        {/* Career Recommendation */}
        <View style={styles.careerCard}>
          <Text style={styles.sectionTitle}>
            Recommended Career Field
          </Text>

          <Text style={styles.careerField}>
            {finalSelectedField}
          </Text>
        </View>

        {/* All RIASEC Scores */}
        <View style={styles.scoresCard}>
          <Text style={styles.sectionTitle}>
            Your RIASEC Scores
          </Text>

          {categories.map((category) => {
            const score = Number(scores[category.key]) || 0;

            return (
              <View style={styles.scoreItem} key={category.key}>
                <View style={styles.scoreHeader}>
                  <Text style={styles.scoreName}>
                    {category.key} - {category.name}
                  </Text>

                  <Text style={styles.scoreNumber}>
                    {score}
                  </Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          Math.max((score / 2) * 100, 0),
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Student Information */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Student Information</Text>

          <Text style={styles.infoText}>
            Name: {user?.name || 'Student'}
          </Text>

          <Text style={styles.infoText}>
            Email: {user?.email || 'Not available'}
          </Text>

          <Text style={styles.infoText}>
            City: {city || user?.city || 'Karachi'}
          </Text>

          <Text style={styles.infoText}>
            Role Number: {user?.roleNumber || 'Not available'}
          </Text>
        </View>

        {/* Dashboard Button */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={handleGoToDashboard}
          activeOpacity={0.85}
        >
          <Text style={styles.dashboardButtonText}>
            Go to Dashboard →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 35,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  resultCard: {
    backgroundColor: '#007BFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  resultEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },

  resultLabel: {
    color: '#DBEAFE',
    fontSize: 14,
  },

  categoryName: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 8,
  },

  description: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 21,
  },

  careerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },

  careerField: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#007BFF',
  },

  scoresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  scoreItem: {
    marginBottom: 17,
  },

  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  scoreName: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },

  scoreNumber: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 9,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: 9,
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 25,
    elevation: 2,
  },

  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },

  dashboardButton: {
    backgroundColor: '#007BFF',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});