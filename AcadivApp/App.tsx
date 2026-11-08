import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Main Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import CitySelectionScreen from './src/screens/CitySelectionScreen';
import ChoiceScreen from './src/screens/ChoiceScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import RiasecScreen from './src/screens/RiasecScreen';
import ResultScreen from './src/screens/ResultScreen';
import DashboardScreen from './src/screens/DashboardScreen';

// Other Screens
import CareerExplorerScreen from './src/screens/CareerExplorerScreen';
import InstitutionExplorerScreen from './src/screens/InstitutionExplorerScreen';
import RoadmapScreen from './src/screens/RoadmapScreen';
import  PortfolioScreen  from './src/screens/PortfolioScreen';
import  SettingsScreen  from './src/screens/SettingsScreen';
import BulletinScreen from './src/screens/BulletinScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen
          name="CitySelection"
          component={CitySelectionScreen}
        />

        <Stack.Screen name="Choice" component={ChoiceScreen} />

        <Stack.Screen
          name="DirectFieldScreen"
          component={AssessmentScreen}
        />

        <Stack.Screen name="RiasecScreen" component={RiasecScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />

        {/* Dashboard */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

        {/* Dashboard Feature Screens */}
        <Stack.Screen
          name="CareerExplorerScreen"
          component={CareerExplorerScreen}
        />

        <Stack.Screen
          name="InstitutionExplorerScreen"
          component={InstitutionExplorerScreen}
        />

        <Stack.Screen
          name="RoadmapScreen"
          component={RoadmapScreen}
        />

        <Stack.Screen
          name="PortfolioScreen"
          component={PortfolioScreen}
        />

        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="BulletinScreen"
          component={BulletinScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
