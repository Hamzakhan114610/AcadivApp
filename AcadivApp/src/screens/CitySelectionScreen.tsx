import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getLoggedInUser,
  setLoggedInUser,
} from '../utils/globalUser';

const API_URL = 'http://localhost:5000/api/auth';
const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Quetta',
  'Multan',
];

export default function CitySelectionScreen({ route, navigation }: any) {
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  const user = route.params?.user || getLoggedInUser();

  const handleNext = async () => {
    if (!selectedCity) {
      Alert.alert(
        'Selection Required',
        'Barah-e-karam apna city select karein!'
      );
      return;
    }

    if (!user?._id) {
      Alert.alert(
        'User Error',
        'User ID nahi mila. Please dobara signup karein.'
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/update-profile/${user._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: selectedCity,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        Alert.alert(
          'Update Failed',
          result.message || 'City save nahi ho saki.'
        );
        return;
      }

      const updatedUser = {
        ...user,
        ...result.user,
        city: selectedCity,
      };

      setLoggedInUser(updatedUser);

      navigation.navigate('Choice', {
        user: updatedUser,
        city: selectedCity,
      });

    } catch (error) {
      console.log('City Update Error:', error);

      Alert.alert(
        'Connection Error',
        'Server se connection nahi ho saka. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Select Your City</Text>

        <Text style={styles.subtitle}>
          Aapke ilaqay ke mutabiq colleges aur institutes dikhane ke liye city zaroori hai.
        </Text>
      </View>

      <FlatList
        data={CITIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selectedCity === item;

          return (
            <TouchableOpacity
              style={[
                styles.cityCard,
                isSelected && styles.selectedCityCard,
              ]}
              onPress={() => setSelectedCity(item)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.cityText,
                  isSelected && styles.selectedCityText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            (!selectedCity || loading) && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={!selectedCity || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light theme background
  },
  headerContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  cityCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
  },
  selectedCityCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#007BFF',
  },
  cityText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  selectedCityText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});