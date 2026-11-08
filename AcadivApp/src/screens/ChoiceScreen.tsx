import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLoggedInUser } from '../utils/globalUser';

export default function ChoiceScreen({ route, navigation }: any) {
  const routeUser = route?.params?.user;
  const globalUser = getLoggedInUser();
  const user = routeUser || globalUser;

  // 1. Direct Field Selection -> Navigate to DirectFieldScreen
  const handleDirectSelection = () => {
    navigation.navigate('DirectFieldScreen', { user });
  };

  // 2. Take a RIASEC Career Test -> Navigate to RiasecScreen
  const handleRiasecTest = () => {
    navigation.navigate('RiasecScreen', { user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🧭</Text>
          </View>
          <Text style={styles.title}>How would you like to begin?</Text>
          <Text style={styles.subtitle}>
            Choose your preferred way to set up your career guidance dashboard
          </Text>
        </View>

        {/* Two Main Cards Container */}
        <View style={styles.cardsWrapper}>
          
          {/* Card 1: Direct Field Selection */}
          <TouchableOpacity
            style={styles.choiceCard}
            activeOpacity={0.85}
            onPress={handleDirectSelection}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.cardIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={styles.cardEmoji}>🎯</Text>
              </View>
              <View style={styles.arrowBox}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Direct Field Selection</Text>
            <Text style={styles.cardDesc}>
              Already know what you want to pursue? Pick your domain (Software, AI, Mobile Apps, etc.) and jump straight into your customized dashboard.
            </Text>
          </TouchableOpacity>

          {/* Card 2: Take a RIASEC Career Test */}
          <TouchableOpacity
            style={styles.choiceCard}
            activeOpacity={0.85}
            onPress={handleRiasecTest}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.cardIconBox, { backgroundColor: '#F0FDF4' }]}>
                <Text style={styles.cardEmoji}>🧠</Text>
              </View>
              <View style={styles.arrowBox}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Take a RIASEC Career Test</Text>
            <Text style={styles.cardDesc}>
              Not sure which path fits you best? Take our short interactive assessment test to discover your ideal career matches based on your personality.
            </Text>
          </TouchableOpacity>

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
  scrollContent: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007BFF',
    marginBottom: 16,
    elevation: 2,
  },
  iconEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  cardsWrapper: {
    gap: 16,
  },
  choiceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 24,
  },
  arrowBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});