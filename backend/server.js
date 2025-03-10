import express from 'express';
import { connectDB } from './config/db.js';
import Recipe from './models/recipe.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});

app.get("/api/recipes", (req, res) => {
    Recipe.find({})
        .then(recipes => res.status(200).json({ success: true, data: recipes }))
        .catch(error => {
            console.log("Server Error", error.message);
            res.status(500).json({ success: false, message: "Server Error" });
        });
});

app.post("/api/recipes", (req, res) => {
    const recipe = req.body;
    if (!recipe.name || !recipe.type || !recipe.ingredients || !recipe.instructions) {
        return res.status(400).json({ success: false, message: "Please provide all information" });
    }

    const newRecipe = new Recipe(recipe);
    newRecipe.save()
        .then(() => res.status(201).json({ success: true, data: newRecipe }))
        .catch(error => {
            console.error("Cannot create the recipe", error.message);
            res.status(500).json({ success: false, message: "Server Error" });
        });
});

app.put("/api/recipes/:id", (req, res) => {
    const { id } = req.params;
    const recipe = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Recipe not found! Invalid Recipe" });
    }

    Recipe.findByIdAndUpdate(id, recipe, { new: true })
        .then(updatedRecipe => res.status(200).json({ success: true, data: updatedRecipe }))
        .catch(() => res.status(500).json({ success: false, message: "Server Error!" }));
});

app.delete("/api/recipes/:id", (req, res) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
        .then(() => res.status(200).json({ success: true, message: "Recipe is deleted successfully" }))
        .catch(() => res.status(500).json({ success: false, message: "Server Error!" }));
});

app.get("/api/recipes/:id", (req, res) => {
    const { id } = req.params;
    Recipe.findById(id)
        .then(recipe => {
            if (recipe) {
                res.status(200).json({ success: true, data: recipe });
            } else {
                res.status(404).json({ success: false, message: "Recipe not found!" });
            }
        })
        .catch(error => {
            console.log("Server Error", error.message);
            res.status(500).json({ success: false, message: "Server Error" });
        });
});
