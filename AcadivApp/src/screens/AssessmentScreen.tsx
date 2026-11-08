import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// Path to globalUser helper
import { setLoggedInUser } from '../utils/globalUser';

const API_URL = 'http://localhost:5000/api/auth';

export default function AssessmentScreen({ route, navigation }: any) {
  const { user, city } = route.params || {};

  const [selectedField, setSelectedField] = useState(
    'Software Engineering'
  );
  const [loading, setLoading] = useState(false);

  const handleSaveAndGoToDashboard = async () => {
    const mockUser = user || {
      _id: 'local_123',
      name: 'Student',
      email: 'student@acadiv.com',
      city: city || 'Karachi',
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/update-profile/${mockUser._id || 'local_123'}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selectedField: selectedField,
          }),
        }
      );

      const result = await response.json();

      const updatedUser = {
        ...mockUser,
        ...(result?.user || {}),
        selectedField: selectedField,
      };

      setLoggedInUser(updatedUser);

      // Direct Dashboard Redirection
      navigation.replace('Dashboard', {
        user: updatedUser,
        city: city || updatedUser.city || 'Karachi',
      });

    } catch (error: any) {
      // Local fallback agar network/backend issue ho
      const updatedUser = {
        ...mockUser,
        selectedField: selectedField,
      };

      setLoggedInUser(updatedUser);

      navigation.replace('Dashboard', {
        user: updatedUser,
        city: city || updatedUser.city || 'Karachi',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Field</Text>

      <Text style={styles.subtitle}>
        Selected City: {city || 'Karachi'}
      </Text>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'Software Engineering' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('Software Engineering')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          Software Engineering / MERN Stack
        </Text>

        {selectedField === 'Software Engineering' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'Mobile App Development' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('Mobile App Development')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          Mobile App Development (React Native)
        </Text>

        {selectedField === 'Mobile App Development' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'Artificial Intelligence & Data Science' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('Artificial Intelligence & Data Science')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          Artificial Intelligence & Data Science
        </Text>

        {selectedField === 'Artificial Intelligence & Data Science' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'UI/UX Design' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('UI/UX Design')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          UI/UX Design & Frontend Prototyping
        </Text>

        {selectedField === 'UI/UX Design' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'Commerce & Accounting' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('Commerce & Accounting')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          Commerce & Accounting / Business Admin
        </Text>

        {selectedField === 'Commerce & Accounting' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.card,
          selectedField === 'Psychology & Social Work' &&
            styles.selectedCard,
        ]}
        onPress={() => setSelectedField('Psychology & Social Work')}
        disabled={loading}
      >
        <Text style={styles.cardText}>
          Psychology & Pre-Medical Studies
        </Text>

        {selectedField === 'Psychology & Social Work' && (
          <Text style={styles.selectedText}>Selected ✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveAndGoToDashboard}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Save & Continue to Dashboard
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },

  card: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  selectedCard: {
    borderColor: '#007BFF',
    backgroundColor: '#EFF6FF',
  },

  cardText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },

  selectedText: {
    color: '#007BFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },

  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});