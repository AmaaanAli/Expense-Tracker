import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getExpenses, deleteExpense } from "../utils/api";

const HomeScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, [expenses]);

  const renderItem = ({ item }) => (
    <View className="p-5 bg-stone-800 rounded-2xl shadow-lg mb-4">
      <Text className="font-bold text-2xl text-center tracking-widest text-emerald-500">
        {item.category}
      </Text>
      <View className="border-t border-white my-4" />
      <Text className="py-1 text-xl tracking-widest font-medium text-cyan-400">
        Amount:{" "}
        <Text className="font-normal text-white tracking-widest">
          {item.amount}
        </Text>
      </Text>
      <Text className="text-lg tracking-widest font-medium text-cyan-400">
        Description:{" "}
        <Text className="font-normal text-white tracking-widest">
          {item.description}
        </Text>
      </Text>
      <TouchableOpacity
        onPress={() => handleDelete(item._id)}
        className="mt-4 bg-emerald-600 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-bold tracking-wider">
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-stone-900 p-4">
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Expense Detail")}
        className="bg-red-600 p-4 rounded-lg mb-6"
      >
        <Text className="text-white text-lg text-center font-bold tracking-wide">
          Add New Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
