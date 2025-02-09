import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigation = useNavigation();

  const handleSignup = async () => {
    setError(""); 
    try {
      const response = await axios.post(
        "http://192.168.148.120:5000/auth/register",
        {
          email,
          username,
          password,
        }
      );
      navigation.navigate("Login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); 
      } else {
        setError("Something went wrong. Please try again."); 
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
          Signup
        </Text>
        {error ? (
          <Text className="text-red-500 mb-4">{error}</Text> 
        ) : null}
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#A1A1AA"
          className="border p-4 rounded mb-4 w-80 border-green-400 text-white tracking-widest"
        />
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

        <TouchableOpacity
          onPress={handleSignup}
          className="bg-emerald-500 p-3 rounded w-80 mt-4 flex justify-center items-center"
        >
          <Text className="text-white text-center font-semibold text-base tracking-widest">
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
