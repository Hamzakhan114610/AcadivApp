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

interface BulletinItem {
  _id?: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export default function BulletinScreen({ navigation }: any) {
  const [bulletins, setBulletins] = useState<BulletinItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/bulletins');
      const textResponse = await response.text();

      if (textResponse && textResponse.trim().startsWith('<')) {
        setBulletins(getFallbackBulletins());
        setLoading(false);
        return;
      }

      const result = JSON.parse(textResponse);

      if (result && result.success && Array.isArray(result.data)) {
        setBulletins(result.data);
      } else {
        setBulletins(getFallbackBulletins());
      }
    } catch (error) {
      setBulletins(getFallbackBulletins());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackBulletins = (): BulletinItem[] => {
    return [
      {
        _id: '1',
        title: 'Admissions Open for BS Software Engineering',
        description: 'Top IT institutes in Karachi have announced admissions for Software Engineering and CS programs for the upcoming batch.',
        date: 'Nov 2026',
        category: 'Admissions',
      },
      {
        _id: '2',
        title: 'Sindh Board Merit Scholarships 2026-2027',
        description: 'HEC and Govt of Sindh announced merit and need-based scholarships for intermediate and university students.',
        date: 'Nov 2026',
        category: 'Scholarship',
      },
      {
        _id: '3',
        title: 'Mobile App Development Hackathon',
        description: 'Register now for the Karachi Youth Tech Hackathon. Build React Native & Flutter apps and win cash prizes.',
        date: 'Oct 2026',
        category: 'Events',
      },
      {
        _id: '4',
        title: 'Free AI & Data Science Bootcamp by SMIT',
        description: 'Saylani Mass IT Training opens fresh registrations for Machine Learning, Python, and Data Science cohorts.',
        date: 'Oct 2026',
        category: 'Training',
      },
      {
        _id: '5',
        title: 'UI/UX Design & Portfolio Workshop',
        description: 'Join an interactive 3-day online workshop on Figma, wireframing, and user interface design standards.',
        date: 'Oct 2026',
        category: 'Workshop',
      },
      {
        _id: '6',
        title: 'Commerce & CA Career Counseling Session',
        description: 'Free guidance seminar for Commerce students on ACCA, CA, and BBA admission roadmaps.',
        date: 'Sep 2026',
        category: 'Seminar',
      },
      {
        _id: '7',
        title: 'Govt Science College Entry Test Dates',
        description: 'Adamjee & DJ Science College have issued tentative entrance test and merit list schedules for new applicants.',
        date: 'Sep 2026',
        category: 'Notice',
      },
      {
        _id: '8',
        title: 'University of Karachi Postgraduate Admissions',
        description: 'Postgraduate and BS 3rd Year open-merit admissions are now accepting online applications.',
        date: 'Aug 2026',
        category: 'Admissions',
      },
      {
        _id: '9',
        title: 'Zakat & Ushr Need-Based Educational Grants',
        description: 'Sindh Zakat department releases fresh funding applications for deserving students in public universities.',
        date: 'Aug 2026',
        category: 'Financial Aid',
      },
      {
        _id: '10',
        title: 'National Freelancing & Remote Work Expo',
        description: 'Learn how to secure international client projects in Web Dev, App Dev, and UI Design from industry leaders.',
        date: 'Jul 2026',
        category: 'Expo',
      },
    ];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bulletin & News</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>Latest updates, announcements & career alerts</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 40 }} />
        ) : Array.isArray(bulletins) && bulletins.length > 0 ? (
          bulletins.map((item, index) => (
            <View key={item._id || index.toString()} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTag}>{item.category || 'Announcement'}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Koi bulletins dastiyab nahi hain.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 👈 Yahan theek kar diya hai (justifyContent)
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    fontSize: 11,
    color: '#007BFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  noDataText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});