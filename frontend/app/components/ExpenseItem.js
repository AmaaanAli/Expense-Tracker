import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded mb-2">
      <View>
        <Text className="font-bold text-lg">{expense.category}</Text>
        <Text>{expense.description}</Text>
        <Text className="text-blue-500 font-semibold">${expense.amount}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(expense._id)}>
        <Text className="text-red-500 font-bold">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;
