import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLoggedInUser, setLoggedInUser } from '../utils/globalUser';

const API_URL = 'http://localhost:5000/api/auth';

export default function SettingsScreen({ route, navigation }: any) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      // 1. First check params or global saved session user
      const paramUser = route?.params?.user;
      const cachedUser = getLoggedInUser();
      const currentUser = paramUser || cachedUser;

      // 2. If user ID available, fetch fresh details from Backend API
      if (currentUser && (currentUser._id || currentUser.id)) {
        const userId = currentUser._id || currentUser.id;
        const response = await fetch(`${API_URL}/profile/${userId}`);
        const result = await response.json();

        if (response.ok && (result.user || result.success)) {
          const freshData = result.user || result;
          setUserData(freshData);
          setLoggedInUser(freshData);
          setLoading(false);
          return;
        }
      }

      // 3. Fallback to passed user data or global user state
      if (currentUser) {
        setUserData(currentUser);
      } else {
        setUserData({
          name: 'Sir Zain',
          email: 'zain@acadiv.com',
          roleNumber: 'ACADIV-9988',
          selectedField: 'Software Engineering',
          city: 'Karachi',
        });
      }
    } catch (error) {
      // Fallback in case backend server timeout/offline during local dev
      const cachedUser = getLoggedInUser() || route?.params?.user;
      setUserData(cachedUser || {
        name: 'Sir Zain',
        email: 'zain@acadiv.com',
        roleNumber: 'ACADIV-9988',
        selectedField: 'Software Engineering',
        city: 'Karachi',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Kya aap account se sign out karna chahte hain?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          setLoggedInUser(null);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Account Settings loading...</Text>
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
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Dynamic User Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(userData?.name ? userData.name.substring(0, 2) : 'SZ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.profileName}>{userData?.name || 'Sir Zain'}</Text>
          <Text style={styles.profileEmail}>{userData?.email || 'zain@acadiv.com'}</Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{userData?.roleNumber || 'ACADIV-9988'}</Text>
            </View>
          </View>
        </View>

        {/* User Account Details Section */}
        <Text style={styles.sectionHeader}>Profile Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{userData?.name || 'Sir Zain'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userData?.email || 'zain@acadiv.com'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Selected Field</Text>
            <Text style={[styles.infoValue, { color: '#007BFF', fontWeight: 'bold' }]}>
              {userData?.selectedField || 'Software Engineering'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>{userData?.city || 'Karachi'}</Text>
          </View>
        </View>

        {/* Application Preferences Section */}
        <Text style={styles.sectionHeader}>Preferences & Support</Text>
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => navigation.navigate('CitySelection')}>
            <Text style={styles.actionText}>🌐 Change City Preference</Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => navigation.navigate('DirectFieldScreen')}>
            <Text style={styles.actionText}>🎯 Change Career Field</Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => Alert.alert('Acadiv Help', 'Contact support at support@acadiv.com')}>
            <Text style={styles.actionText}>❓ Help & Technical Support</Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}>
          <Text style={styles.logoutButtonText}>Sign Out Account</Text>
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
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  badgeText: {
    color: '#007BFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  arrowText: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: 'bold',
  },
});