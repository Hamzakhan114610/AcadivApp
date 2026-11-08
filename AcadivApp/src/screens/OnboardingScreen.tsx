import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.heroBox}>
        <Text style={styles.heroIcon}>🎓</Text>
        <Text style={styles.title}>Discover Your Ideal Career</Text>
        <Text style={styles.description}>
          Acadiv helps matric and intermediate students choose the right academic fields, institutes, and skill roadmaps.
        </Text>
      </View>

      <View style={styles.btnBox}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    justifyContent: 'space-between',
  },
  heroBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  btnBox: {
    marginBottom: 30,
  },
  primaryBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default OnboardingScreen;