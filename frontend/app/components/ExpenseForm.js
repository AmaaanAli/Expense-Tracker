import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";

const ExpenseForm = ({ onSubmit }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const expenseData = { category, amount: parseFloat(amount), description };
    onSubmit(expenseData);

    setCategory("");
    setAmount("");
    setDescription("");
  };

  return (
    <View>
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor="#A1A1AA"
        className="border p-4 rounded-lg mb-4 w-80 border-cyan-400 text-white tracking-widest"
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor="#A1A1AA"
        className="border p-4 rounded-lg mb-4 w-80 border-cyan-400 text-white tracking-widest"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#A1A1AA"
        className="border p-4 rounded-lg mb-4 w-80 border-cyan-400 text-white tracking-widest"
      />
      {/* <Button title="Add Expense" onPress={handleSubmit} /> */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-cyan-500 p-3 rounded w-80 mt-4 flex justify-center items-center"
      >
        <Text className="text-white text-center font-semibold text-base tracking-widest">
          Add Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseForm;
