import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }: any) {
  // Animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parallel Animations: Logo Zoom/Fade-In + Text Slide-Up
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2.5 Seconds ke baad Login screen par navigate karne ke liye
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.contentContainer}>
        {/* Animated Icon & Title */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🎓</Text>
          </View>
          <Text style={styles.brandTitle}>Acadiv</Text>
        </Animated.View>

        {/* Animated Tagline */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}>
          <Text style={styles.tagline}>Shape Your Future Path</Text>
          <Text style={styles.subTagline}>Career & Institute Guidance Platform</Text>
        </Animated.View>
      </View>

      {/* Footer Branding */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Kodex Solution</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Clean Light Theme Background
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007BFF',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#007BFF',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  iconText: {
    fontSize: 42,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subTagline: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});