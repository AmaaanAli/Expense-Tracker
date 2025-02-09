import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setModalVisible(false);
    navigation.replace("Auth");
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/50">
      {modalVisible && (
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg shadow-lg w-3/4">
              <Text className="text-lg font-bold mb-4 text-center">
                Confirm Logout
              </Text>
              <Text className="text-center mb-4">
                Are you sure you want to log out?
              </Text>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="bg-gray-300 p-3 rounded w-1/3"
                >
                  <Text className="text-center text-gray-700">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLogout}
                  className="bg-red-500 p-3 rounded w-1/3"
                >
                  <Text className="text-center text-white">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};


export default LogoutModal;
