import React, { useEffect } from "react";
import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ExpenseDetailScreen from "./screens/ExpenseDetailScreen";
import LogoutModal from "./screens/LogoutModal"; 
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "@/global.css";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppDrawer = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      drawerStyle: {
        backgroundColor: "#292524", 
      },
      drawerActiveTintColor: "#34D399", 
      drawerInactiveTintColor: "#D1D5DB", 
      drawerActiveBackgroundColor: "#1F2937", 
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 1,
      },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),
        headerStyle: {
          backgroundColor: "#292524",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "semibold",
          letterSpacing: 1,
        },
      }}
    />
    <Drawer.Screen
      name="Expense Detail"
      component={ExpenseDetailScreen}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="description" size={size} color={color} />
        ),
        headerStyle: {
          backgroundColor: "#292524",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "semibold",
          letterSpacing: 1,
        },
      }}
    />

    <Drawer.Screen
      name="Logout"
      component={() => null}
      options={{
        drawerIcon: ({ color, size }) => (
          <Icon name="logout" size={size} color={color} />
        ),
        title: "Logout",
      }}
      listeners={({ navigation }) => ({
        drawerItemPress: (e) => {
          e.preventDefault();
          navigation.navigate("LogoutModal");
        },
      })}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1c1917" />
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppDrawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogoutModal"
          component={LogoutModal}
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        />
      </Stack.Navigator>
    </>
  );
}