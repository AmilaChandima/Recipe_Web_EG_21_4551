import express from 'express';
import { connectDB } from './config/db.js';
import Recipe from './models/recipe.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
//const cors = require('cors')



const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`); 
});


app.get("/api/recipes",async(req,res)=>{
    try {
        const recipes = await Recipe.find({});
        res.status(200).json({success: true, data: recipes});
    } catch (error) {
        console.log("Server Error",error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})


app.post("/api/recipes",async (req,res)=>{
    const recipe = req.body;
    if (!recipe.name || !recipe.type || !recipe.ingredients || !recipe.instructions){
        return res.status(400).json({success:false, message: "Please provide all information"});
    }

    const newRecipe = new Recipe(recipe)

    try {
        await newRecipe.save();
        res.status(201).json({success: true, data: newRecipe});
    } catch (error) {
        console.error("Cannot create the recipe",error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }

});


app.put("/api/recipes/:id",async(req,res)=>{
    const {id} = req.params;

    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Recipe not found! Invalid Recipe"});
    }


    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {new:true});
        res.status(200).json({success: true,data: updatedRecipe});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error!"});
    }
})


app.delete("/api/recipes/:id", async (req,res)=>{
    const {id} = req.params;
    
    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Recipe is deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false, message: "Sever Error!"});
    }
});

app.get("/api/recipes/:id", async (req,res)=>{
    const {id} = req.params;

    try {
        const recipes = await Recipe.findById(id);
        res.status(200).json({success: true, data: recipes});
    } catch (error) {
        console.log("Server Error",error.message);
        res.status(404).json({success: false, message: "Recipe not found!"});
    }
});


// o6kqvRXGtSp7cZy5
// mongodb+srv://amilachandima2001:o6kqvRXGtSp7cZy5@cluster0.truys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0