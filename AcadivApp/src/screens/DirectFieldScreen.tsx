import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLoggedInUser } from '../utils/globalUser';

export default function DashboardScreen({ route, navigation }: any) {
  // 1. All hooks top level
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'explorer' | 'settings'>('home');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const routeUser = route?.params?.user;
    const storedUser = getLoggedInUser();
    const finalUser = routeUser || storedUser || {
      name: 'Student',
      email: 'student@acadiv.com',
      roleNumber: 'ACADIV-9988',
      selectedField: 'Software Engineering',
      city: 'Karachi',
    };

    setUserData(finalUser);
    setLoading(false);
  }, [route?.params?.user]);

  const openFeatureModal = (title: string, content: string, targetScreen?: string) => {
    if (targetScreen) {
      try {
        navigation.navigate(targetScreen);
      } catch (e) {
        setModalTitle(title);
        setModalContent(content);
        setModalVisible(true);
      }
    } else {
      setModalTitle(title);
      setModalContent(content);
      setModalVisible(true);
    }
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
    selectedField: 'Software Engineering',
    city: 'Karachi',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Welcome back 👋</Text>
          <Text style={styles.userName}>{user.name || 'Student'}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileBadge}
          onPress={() => openFeatureModal('User Profile', `Name: ${user.name}\nEmail: ${user.email}\nRole: ${user.roleNumber}`)}>
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
              <Text style={styles.roleChipText}>{user.roleNumber || 'ACADIV-9988'}</Text>
            </View>
            <Text style={styles.cityText}>📍 {user.city || 'Karachi'}</Text>
          </View>
          <Text style={styles.cardFieldTitle}>Selected Career Field</Text>
          <Text style={styles.cardFieldValue}>
            {user.selectedField || 'Software Engineering'}
          </Text>
        </View>

        {/* Dynamic Action Grid (Roadmap, Career Explorer, Institutes, Portfolio, Settings) */}
        <Text style={styles.sectionTitle}>Dashboard Features & Modules</Text>

        <View style={styles.actionGrid}>
          {/* 1. Roadmap */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('Software Engineering Roadmap', '1. Matriculation (Computer Science)\n2. DAE / Intermediate (Pre-Engg / ICS)\n3. BS Software Engineering / Aptech ADSE\n4. MERN Stack & Mobile App Mastery')}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <Text style={styles.actionIcon}>🗺️</Text>
            </View>
            <Text style={styles.actionCardTitle}>Career Roadmap</Text>
            <Text style={styles.actionCardSub}>Step-by-step Software Engineering path</Text>
          </TouchableOpacity>

          {/* 2. Career Explorer */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('Career Explorer', 'Explore options in Full Stack Web Development, React Native Mobile Development, UI/UX Design, and Cloud DevOps.', 'DirectFieldScreen')}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.actionIcon}>🔍</Text>
            </View>
            <Text style={styles.actionCardTitle}>Career Explorer</Text>
            <Text style={styles.actionCardSub}>Discover tech fields & salary projections</Text>
          </TouchableOpacity>

          {/* 3. Institute Explorer */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('Karachi Institutes', 'Top Institutes in Karachi:\n- FAST NUCES\n- NED University\n- UBIT (University of Karachi)\n- Aptech Computer Education')}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#E0E7FF' }]}>
              <Text style={styles.actionIcon}>🏛️</Text>
            </View>
            <Text style={styles.actionCardTitle}>Institute Explorer</Text>
            <Text style={styles.actionCardSub}>Find top universities & institutes in Karachi</Text>
          </TouchableOpacity>

          {/* 4. Portfolio Builder */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('Portfolio Showcase', 'Showcase your MERN projects, GitHub links, and React Native mobile applications to potential employers.')}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <Text style={styles.actionIcon}>💼</Text>
            </View>
            <Text style={styles.actionCardTitle}>Portfolio Builder</Text>
            <Text style={styles.actionCardSub}>Track projects & student credentials</Text>
          </TouchableOpacity>

          {/* 5. Assessment Retake */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('RIASEC Assessment', 'Opening Holland Code Personality Test...', 'RiasecScreen')}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.actionIcon}>🧩</Text>
            </View>
            <Text style={styles.actionCardTitle}>RIASEC Test</Text>
            <Text style={styles.actionCardSub}>Re-assess interest alignment</Text>
          </TouchableOpacity>

          {/* 6. App Settings */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openFeatureModal('Settings & Preferences', 'App Version: 1.0.0\nTheme: Light Modern Blue\nLogged in as: ' + user.email)}
            activeOpacity={0.85}>
            <View style={[styles.actionIconCircle, { backgroundColor: '#F3E8FF' }]}>
              <Text style={styles.actionIcon}>⚙️</Text>
            </View>
            <Text style={styles.actionCardTitle}>Settings</Text>
            <Text style={styles.actionCardSub}>Account details & preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Feature Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitleText}>{modalTitle}</Text>
            <Text style={styles.modalBodyText}>{modalContent}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.bottomNavIcon, activeTab === 'home' && styles.activeIcon]}>🏠</Text>
          <Text style={[styles.bottomNavText, activeTab === 'home' && styles.activeText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem} onPress={() => openFeatureModal('Career Explorer', 'Explore options in Full Stack Web Development, React Native Mobile Development, UI/UX Design, and Cloud DevOps.', 'DirectFieldScreen')}>
          <Text style={styles.bottomNavIcon}>🔍</Text>
          <Text style={styles.bottomNavText}>Explorer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavItem} onPress={() => openFeatureModal('Settings & Preferences', 'App Version: 1.0.0\nTheme: Light Modern Blue\nLogged in as: ' + user.email)}>
          <Text style={styles.bottomNavIcon}>⚙️</Text>
          <Text style={styles.bottomNavText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
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
  userCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  roleChip: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  roleChipText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  cityText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500' },
  cardFieldTitle: { color: '#DBEAFE', fontSize: 13 },
  cardFieldValue: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#1F2937', marginBottom: 14 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
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
  actionIconCircle: { width: 46, height: 46, borderRadius: 23, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionIcon: { fontSize: 22 },
  actionCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  actionCardSub: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, elevation: 5 },
  modalTitleText: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
  modalBodyText: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 20 },
  modalButton: { backgroundColor: '#007BFF', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  modalButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
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