import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.148.120:5000/expenses",
});

export const setAuthHeader = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};

export const getExpenses = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching expenses:",
      error.response?.data || error.message
    );
  }
};

export const addExpense = async (expenseData) => {
  try {
    const response = await api.post("/", expenseData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response?.data || error.message
    );
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    const response = await api.delete(`/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response?.data || error.message
    );
  }
};
