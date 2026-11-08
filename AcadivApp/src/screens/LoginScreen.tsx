import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setLoggedInUser } from '../utils/globalUser';

const API_URL = 'http://localhost:5000/api/auth/login';

const LoginScreen = ({ navigation, route }: any) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [selectedField, setSelectedField] = useState('Software Engineering');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Login failed.');
        return;
      }

      const user = data.user || data;

      const userData = {
        ...user,
        name: user.name || identifier.trim().split('@')[0],
        email: user.email || identifier.trim(),
        roleNumber: user.roleNumber || '',
        selectedField: user.selectedField || selectedField,
        city: user.city || route?.params?.city || 'Karachi',
      };

      setLoggedInUser(userData);

      navigation.replace('Dashboard', {
        user: userData,
        selectedField: userData.selectedField,
        city: userData.city,
      });
    } catch (error) {
      Alert.alert('Connection Error', 'Cannot connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>🎓</Text>
              </View>
              <Text style={styles.appName}>ACADIV</Text>
              <Text style={styles.tagline}>Discover Your Future</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.heading}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Login to continue your career journey.
              </Text>

              <Text style={styles.label}>Email / Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email or username"
                placeholderTextColor="#9CA3AF"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.footer}>
              Your Future Starts With ACADIV
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 25,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  logoCircle: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  logoText: {
    fontSize: 32,
  },
  appName: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 3,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 9,
    marginTop: 14,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 11,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    height: 53,
    backgroundColor: '#007BFF',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
  },
  signupText: {
    fontSize: 13,
    color: '#6B7280',
  },
  signupLink: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 28,
  },
});