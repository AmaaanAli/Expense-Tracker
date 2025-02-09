import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addExpense } from "../utils/api";
import ExpenseForm from "../components/ExpenseForm";

const ExpenseDetailScreen = () => {
  const navigation = useNavigation();

  const handleAddExpense = async (expenseData) => {
    await addExpense(expenseData);
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1 justify-center items-center bg-stone-900">
      <View className="max-w-sm rounded-lg overflow-hidden bg-stone-800 p-6">
        <ExpenseForm onSubmit={handleAddExpense} />
      </View>
    </View>
  );
};

export default ExpenseDetailScreen;
