import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

// Home Screen Component
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hello, Storytime!</Text>
    </View>
  );
}

// Create the stack navigator
const Stack = createNativeStackNavigator();

// Main navigation component
export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Export screen types for type safety
export type RootStackParamList = {
  Home: undefined;
};
