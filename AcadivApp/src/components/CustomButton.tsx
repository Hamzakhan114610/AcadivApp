import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../theme/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    if (variant === 'secondary') return styles.secondaryBtn;
    if (variant === 'outline') return styles.outlineBtn;
    return styles.primaryBtn;
  };

  const getTextStyle = () => {
    if (variant === 'outline') return styles.outlineText;
    return styles.btnText;
  };

  return (
    <TouchableOpacity
      style={[styles.baseBtn, getButtonStyle(), disabled && styles.disabledBtn, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.oceanCyan : Colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: Colors.oceanCyan,
  },
  secondaryBtn: {
    backgroundColor: Colors.surfaceCharcoal,
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.oceanCyan,
  },
  disabledBtn: {
    opacity: 0.5,
  },
  btnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  outlineText: {
    color: Colors.oceanCyan,
    fontSize: 15,
    fontWeight: '700',
  },
});