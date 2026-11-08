import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { allInstitutes } from '../data/collegesData';

export const InstitutionExplorerScreen = ({ navigation }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏫 Institution Explorer</Text>
      <Text style={styles.subHeader}>Browse colleges and technical institutes nationwide.</Text>

      {allInstitutes.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.type}>{item.type} • {item.location}</Text>
          <Text style={styles.fee}>Fee: {item.fee}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    paddingTop: 45,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subHeader: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  type: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 4,
  },
  fee: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  backBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: '#0284C7',
    fontWeight: 'bold',
  },
});

export default InstitutionExplorerScreen;