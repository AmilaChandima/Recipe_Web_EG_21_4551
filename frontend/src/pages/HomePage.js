import React, { useEffect, useState } from 'react';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../services/recipeService';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    
    getRecipes();
  }, []);

  console.log("recipes", recipes);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8} align={"start"}>
        <Text fontSize={"35"} fontWeight={"bold"} textAlign={"center"}>
          My Recipes
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;
