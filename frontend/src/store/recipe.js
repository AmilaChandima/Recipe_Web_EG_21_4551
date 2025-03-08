import { create } from "zustand";

export const crudRecipe = create((set)=>({
  recipes: [],
  setRecipes: (recipes) => set({recipes}),
  createRecipe: async (newRecipe) => {
    if(!newRecipe.name || !newRecipe.type || !newRecipe.ingredients || !newRecipe.instructions){
      return {success: false, message: "Please Add All Details!"};
    }
    const res = await fetch("http://localhost:5000/api/recipes",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newRecipe)
    })
    const data = await res.json();

    set((state) => ({recipes:[...state.recipes, data.data]}));
    return {success: true, message: "Recipe added successfully"};
  },
  fetchRecipes: async () => {
    const res = await fetch("http://localhost:5000/api/recipes");
    const data = await res.json();
    set({recipes: data.data});
  },
  deleteRecipe: async (id) => {
    const res = await fetch(`http://localhost:5000/api/recipes/${id}`,{
      method: "DELETE",
  });
  const data = await res.json();
  if(!data.success) return {success: false, message: data.message};

  // Refresh the ui
  set(state => ({recipes: state.recipes.filter(recipe => recipe._id !== id)}));
  return {success: true, message: data.message};
  },
  fetchRecipeById: async (id) => {
    const res = await fetch(`http://localhost:5000/api/recipes/${id}`,{
      method: "GET"
    });

    const data = await res.json();
    return data.data;
  },
  updateRecipeById: async (id, updatedRecipe) => {
    const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    });

    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // Update state after updating the recipe
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe._id === id ? data.data : recipe
      ),
    }));

    return { success: true, message: "Recipe updated successfully" };
  }
}));

