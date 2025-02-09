import React, { useState } from "react";
import { TextInput, Button, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setAuthHeader } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.148.120:5000/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      await AsyncStorage.setItem("auth_token", token);
      setAuthHeader(token);
      navigation.navigate("AppDrawer");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Something went wrong");
      } else {
        
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-stone-900">
      <View className="max-w-sm rounded overflow-hidden bg-stone-800 p-4">
        <Text
          style={{ letterSpacing: 2 }}
          className="text-2xl mb-4 text-white font-bold"
        >
          Login
        </Text>

        {error ? ( 
          <Text className="text-red-500 text-sm mb-4">{error}</Text>
        ) : null}

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#A1A1AA"
          className="border p-4 rounded mb-4 w-80 border-green-400 text-white tracking-widest"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#A1A1AA"
          className="border p-4 rounded mb-4 w-80 border-green-400 text-white tracking-widest"
        />

        <View className="flex flex-row gap-2">
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-emerald-500 p-3 rounded w-40 mt-4"
          >
            <Text className="text-white text-center font-semibold text-base tracking-widest">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            className="bg-emerald-500 p-3 rounded w-40 mt-4"
          >
            <Text className="text-white text-center font-semibold text-base tracking-widest">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
