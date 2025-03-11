import { Box, Button, Container, Heading, Input, VStack, Select, FormControl, FormLabel, useToast, HStack, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createRecipe } from '../services/recipeService';

const CreatePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    type: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleAddRecipe = async () => {
    try {
      const { success, message } = await createRecipe(newRecipe);
      console.log("Success:", success);
      console.log("Message:", message);

      if (success) {
        setNewRecipe({ name: "", type: "", ingredients: "", instructions: "", image: "" });
        navigate("/");

        toast({
          title: 'Recipe Added',
          description: "New recipe has been successfully added",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Recipe Not Added',
          description: message || "Please provide all necessary details",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast({
        title: 'Error',
        description: "An error occurred while adding the recipe",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Container maxW={"1140px"} mt={10}>
      <VStack spacing={8}>
        <Heading as="h1" fontSize="38" textAlign={"center"} mb={8}>
          Add New Recipe
        </Heading>

        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <FormControl mb={4}>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              placeholder="Recipe Name"
              name="name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
          </FormControl>
          
          <FormControl mb={4}>
            <FormLabel>Recipe Type</FormLabel>
            <Select
              placeholder="Select Type"
              value={newRecipe.type}
              onChange={(e) => setNewRecipe({ ...newRecipe, type: e.target.value })}
            >
              <option value="VEG">VEG</option>
              <option value="NON-VEG">NON-VEG</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Ingredients</FormLabel>
            <Input
              placeholder="Ingredients ex: rice - 1 cup, water - 2 cups etc"
              name='ingredients'
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Instructions</FormLabel>
            <Input
              placeholder="Instructions"
              name='instructions'
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>
              Image URL (optional){" "}
              <span style={{ color: "gray", fontSize: "12px" }}>
                : to get images from Unsplash{" "}
                <Link href="https://unsplash.com/" isExternal color="blue.500">
                  Click Here
                </Link>
              </span>
            </FormLabel>

            <Input
              placeholder="Image URL"
              name="image"
              value={newRecipe.image}
              onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
            />
          </FormControl>

          <HStack justifyContent={'space-between'}>
            <Button onClick={handleAddRecipe} colorScheme='blue'>
              Add Recipe
            </Button>
            <Button onClick={() => navigate('/')}>Cancel</Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
