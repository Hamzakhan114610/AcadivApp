import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLoggedInUser } from '../utils/globalUser';

export default function PortfolioScreen({ route, navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramUser = route?.params?.user;
    const cachedUser = getLoggedInUser();
    const currentUser = paramUser || cachedUser || {
      name: 'Sir Zain',
      email: 'zain@acadiv.com',
      roleNumber: 'ACADIV-9988',
      selectedField: 'Software Engineering',
      city: 'Karachi',
    };

    setUserData(currentUser);
    setLoading(false);
  }, [route?.params?.user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading Portfolio...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Portfolio</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Identity Banner */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(userData?.name ? userData.name.substring(0, 2) : 'SZ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.profileName}>{userData?.name || 'Sir Zain'}</Text>
          <Text style={styles.profileRole}>
            {userData?.selectedField || 'Software Engineering'} Student
          </Text>
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{userData?.roleNumber || 'ACADIV-9988'}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>📍 {userData?.city || 'Karachi'}</Text>
            </View>
          </View>
        </View>

        {/* Portfolio Projects Section */}
        <Text style={styles.sectionHeader}>Featured Projects & Work</Text>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>🚀 Acadiv Career Platform</Text>
          <Text style={styles.projectTech}>React Native • TypeScript • Node.js • MongoDB</Text>
          <Text style={styles.projectDesc}>
            A comprehensive student post-matriculation pathway & career guidance mobile application tailored for students in Karachi.
          </Text>
        </View>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>💻 Full Stack MERN E-Commerce</Text>
          <Text style={styles.projectTech}>React.js • Express.js • MongoDB • Tailwind CSS</Text>
          <Text style={styles.projectDesc}>
            Custom clothing store web portal featuring category filtering, cart management, and admin inventory control dashboard.
          </Text>
        </View>

        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>📱 MediTrack App</Text>
          <Text style={styles.projectTech}>React Native • Firebase • OCR Vision API</Text>
          <Text style={styles.projectDesc}>
            Smart family medication management platform integrated with prescription text scanner notifications.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 6,
  },
  backButtonText: {
    fontSize: 22,
    color: '#111827',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  chip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  chipText: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    marginTop: 4,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 12,
    color: '#007BFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  projectDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
});