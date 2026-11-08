import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryMidnight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  backBtn: {
    marginBottom: 8,
  },
  backText: {
    color: Colors.oceanCyan,
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
});