import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes"; 


export const createRecipe = async (newRecipe) => {
  try {
    const res = await axios.post(API_URL, newRecipe);
    return { success: true, data: res.data.data, message: "Recipe added successfully" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error adding recipe" };
  }
};


export const fetchRecipes = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};


export const fetchRecipeById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};


export const updateRecipeById = async (id, updatedRecipe) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedRecipe);
    return { success: true, data: res.data.data, message: "Recipe updated successfully" };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error updating recipe" };
  }
};


export const deleteRecipe = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return { success: true, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error deleting recipe" };
  }
};
