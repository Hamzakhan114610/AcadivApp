import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Linking,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getLoggedInUser } from '../utils/globalUser';
import { allInstitutes } from '../data/collegesData';

export default function DashboardScreen({ route, navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'explorer' | 'settings'>('home');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const routeUser = route?.params?.user || {};
    const storedUser = getLoggedInUser() || {};

    const finalUser = {
      ...storedUser,
      ...routeUser,
      selectedField:
        route?.params?.selectedField ||
        routeUser.selectedField ||
        storedUser.selectedField ||
        '',
      city:
        route?.params?.city ||
        routeUser.city ||
        storedUser.city ||
        'Karachi',
    };

    setUserData(finalUser);
    setLoading(false);
  }, [
    route?.params?.user,
    route?.params?.selectedField,
    route?.params?.city,
  ]);

  // Navigate to actual full screen
  const openFeatureScreen = (screenName: string) => {
    navigation.navigate(screenName, {
      user: userData,
      selectedField: userData?.selectedField || '',
      city: userData?.city || 'Karachi',
    });
  };

  // Profile information popup
  const showProfile = () => {
    setModalTitle('User Profile');
    setModalContent(
      `Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.roleNumber}`
    );
    setModalVisible(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </SafeAreaView>
    );
  }

  const user = userData || {
    name: 'Student',
    email: 'student@acadiv.com',
    roleNumber: 'ACADIV-9988',
    selectedField: '',
    city: 'Karachi',
  };

  const selectedField = user.selectedField || '';

  const collegeKeywords: { [key: string]: string[] } = {
    'Software Engineering': ['ICS', 'Pre-Engineering'],
    'Mobile App Development': ['ICS', 'Pre-Engineering'],
    'Artificial Intelligence & Data Science': ['ICS', 'Pre-Engineering'],
    'UI/UX Design': ['ICS'],
    'Graphic Design': ['ICS'],
    'Business Administration': ['Commerce', 'Economics', 'I.Com'],
    'Commerce & Accounting': ['Commerce', 'Economics', 'I.Com'],
    'Psychology & Social Work': ['Pre-Medical'],
    'Computer Science': ['ICS', 'Pre-Engineering'],
  };

  const keywords = collegeKeywords[selectedField] || [];

  const matchingColleges = allInstitutes.filter(institute => {
    if (
      institute.category !== 'Government' &&
      institute.category !== 'Private'
    ) {
      return false;
    }

    const collegeType = institute.type.toLowerCase();

    return keywords.some(keyword =>
      collegeType.includes(keyword.toLowerCase())
    );
  });

  const openWebsite = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Website Error', 'Unable to open this website.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Welcome back 👋</Text>
          <Text style={styles.userName}>{user.name || 'Student'}</Text>
        </View>

        <TouchableOpacity
          style={styles.profileBadge}
          onPress={showProfile}
        >
          <Text style={styles.profileBadgeText}>
            {(user.name ? user.name.substring(0, 2) : 'SE').toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userCardHeader}>
            <View style={styles.roleChip}>
              <Text style={styles.roleChipText}>
                {user.roleNumber || 'ACADIV-9988'}
              </Text>
            </View>

            <Text style={styles.cityText}>📍 {user.city || 'Karachi'}</Text>
          </View>

          <Text style={styles.cardFieldTitle}>Selected Career Field</Text>
          <Text style={styles.cardFieldValue}>
            {selectedField || 'No field selected'}
          </Text>
        </View>

        {/* Features */}
        <Text style={styles.sectionTitle}>
          Dashboard Features & Modules
        </Text>

        <View style={styles.actionGrid}>

          {/* 1. Career Roadmap */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureScreen('RoadmapScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <Text style={styles.actionIcon}>🗺️</Text>
            </View>
            <Text style={styles.actionCardTitle}>Career Roadmap</Text>
            <Text style={styles.actionCardSub}>Step-by-step career path</Text>
          </TouchableOpacity>

          {/* 2. Career Explorer */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureScreen('CareerExplorerScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.actionIcon}>🔍</Text>
            </View>
            <Text style={styles.actionCardTitle}>Career Explorer</Text>
            <Text style={styles.actionCardSub}>Discover career options</Text>
          </TouchableOpacity>

          {/* 3. College Explorer */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => {
              setActiveTab('explorer');
              openFeatureScreen('InstitutionExplorerScreen');
            }}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#E0E7FF' }]}>
              <Text style={styles.actionIcon}>🏛️</Text>
            </View>
            <Text style={styles.actionCardTitle}>College Explorer</Text>
            <Text style={styles.actionCardSub}>Find recommended colleges</Text>
          </TouchableOpacity>

          {/* 4. Portfolio Builder */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureScreen('PortfolioScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.actionIcon}>💼</Text>
            </View>
            <Text style={styles.actionCardTitle}>Portfolio Builder</Text>
            <Text style={styles.actionCardSub}>Track projects and credentials</Text>
          </TouchableOpacity>

          {/* 5. RIASEC Test */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureScreen('RiasecScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.actionIcon}>🧩</Text>
            </View>
            <Text style={styles.actionCardTitle}>RIASEC Test</Text>
            <Text style={styles.actionCardSub}>Re-assess interest alignment</Text>
          </TouchableOpacity>

          {/* 6. Admissions Bulletin (Replaced Settings Card) */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureScreen('BulletinScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Text style={styles.actionIcon}>📢</Text>
            </View>
            <Text style={styles.actionCardTitle}>Admissions Bulletin</Text>
            <Text style={styles.actionCardSub}>Latest college announcements</Text>
          </TouchableOpacity>

        </View>

        {/* Recommended Colleges */}
        <View style={styles.instituteHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top Recommended Colleges</Text>
            <Text style={styles.instituteSubtitle}>
              Based on {selectedField || 'your selected field'}
            </Text>
          </View>

          <Text style={styles.instituteCount}>
            {matchingColleges.length} found
          </Text>
        </View>

        {!selectedField ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Select Your Career Field</Text>
            <Text style={styles.emptyText}>
              Choose a field to see related colleges.
            </Text>

            <TouchableOpacity
              style={styles.selectFieldButton}
              onPress={() => openFeatureScreen('DirectFieldScreen')}
            >
              <Text style={styles.selectFieldButtonText}>Select Field</Text>
            </TouchableOpacity>
          </View>
        ) : matchingColleges.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No Matching Colleges Found</Text>
            <Text style={styles.emptyText}>
              No college in your current data file offers a matching program
              for this field. More college data can be added later.
            </Text>
          </View>
        ) : (
          matchingColleges.map(college => (
            <View key={college.id} style={styles.instituteCard}>
              <View style={styles.instituteTopRow}>
                <Text style={styles.instituteBadge}>{college.badge}</Text>
                <Text style={styles.instituteCategory}>
                  {college.category} College
                </Text>
              </View>

              <Text style={styles.instituteName}>{college.name}</Text>
              <Text style={styles.instituteType}>{college.type}</Text>

              <View style={styles.instituteInfoRow}>
                <Text style={styles.infoLabel}>Fee</Text>
                <Text style={styles.infoValue}>{college.fee}</Text>
              </View>

              <View style={styles.instituteInfoRow}>
                <Text style={styles.infoLabel}>Admissions</Text>
                <Text style={styles.infoValue}>{college.admissionDate}</Text>
              </View>

              <View style={styles.instituteInfoRow}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{college.location}</Text>
              </View>

              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => openWebsite(college.websiteUrl)}
              >
                <Text style={styles.websiteButtonText}>
                  Visit College Website ↗
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}

      </ScrollView>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitleText}>{modalTitle}</Text>
            <Text style={styles.modalBodyText}>{modalContent}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => {
            setActiveTab('home');
            navigation.navigate('Dashboard');
          }}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'home' && styles.activeIcon]}>
            🏠
          </Text>
          <Text style={[styles.bottomNavText, activeTab === 'home' && styles.activeText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => {
            setActiveTab('explorer');
            openFeatureScreen('InstitutionExplorerScreen');
          }}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'explorer' && styles.activeIcon]}>
            🔍
          </Text>
          <Text style={[styles.bottomNavText, activeTab === 'explorer' && styles.activeText]}>
            Explorer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => {
            setActiveTab('settings');
            openFeatureScreen('SettingsScreen');
          }}
        >
          <Text style={[styles.bottomNavIcon, activeTab === 'settings' && styles.activeIcon]}>
            ⚙️
          </Text>
          <Text style={[styles.bottomNavText, activeTab === 'settings' && styles.activeText]}>
            Settings
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}


// ==========================================
// STYLES - ORIGINAL LIGHT THEME
// ==========================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: { marginTop: 12, fontSize: 14, color: '#6B7280' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greetingText: { fontSize: 13, color: '#6B7280' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  profileBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBadgeText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  scrollContent: { padding: 20, paddingBottom: 90 },
  userCard: {
    backgroundColor: '#007BFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
  },
  userCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleChipText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  cityText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
  cardFieldTitle: { color: '#DBEAFE', fontSize: 13 },
  cardFieldValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 22,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  actionIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: { fontSize: 22 },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  actionCardSub: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  instituteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  instituteSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 3 },
  instituteCount: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instituteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  instituteTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  instituteBadge: {
    color: '#007BFF',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    fontSize: 11,
    fontWeight: 'bold',
  },
  instituteCategory: {
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '600',
  },
  instituteName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instituteType: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  instituteInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  infoLabel: { color: '#6B7280', fontSize: 12, flex: 0.8 },
  infoValue: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
    flex: 1.5,
    textAlign: 'right',
  },
  websiteButton: {
    backgroundColor: '#007BFF',
    borderRadius: 9,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 12,
  },
  websiteButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  selectFieldButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9,
    marginTop: 14,
  },
  selectFieldButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  modalBodyText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
  },
  bottomNavItem: { alignItems: 'center' },
  bottomNavIcon: { fontSize: 20, color: '#6B7280' },
  bottomNavText: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  activeIcon: { color: '#007BFF' },
  activeText: { color: '#007BFF', fontWeight: 'bold' },
});