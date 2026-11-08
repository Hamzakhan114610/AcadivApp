import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Available Screens (Jo files aapke paas mawjood hain)
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import CareerExplorerScreen from '../screens/CareerExplorerScreen';
import CitySelectionScreen from '../screens/CitySelectionScreen';
import InstitutionExplorerScreen from '../screens/InstitutionExplorerScreen';
import DirectFieldScreen from '../screens/DirectFieldScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Assessment: undefined;
  CareerExplorer: undefined;
  CitySelection: undefined;
  InstitutionExplorer: undefined;
  DirectField: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
      <Stack.Screen name="CareerExplorer" component={CareerExplorerScreen} />
      <Stack.Screen name="CitySelection" component={CitySelectionScreen} />
      <Stack.Screen name="InstitutionExplorer" component={InstitutionExplorerScreen} />
      <Stack.Screen name="DirectField" component={DirectFieldScreen} />
    </Stack.Navigator>
  );
}