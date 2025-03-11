import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecipeById, updateRecipeById } from "../services/recipeService";
import { Box, Button, Container, Heading, Input, VStack, Select, FormControl, FormLabel, Spinner, useToast, HStack, Link } from "@chakra-ui/react";

const EditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const toast = useToast();

  const [recipe, setRecipe] = useState({
    name: "",
    type: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipeById(id);
        if (data) {
          setRecipe(data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
      setLoading(false);
    };

    getRecipe();
  }, [id]);

  const handleUpdateRecipe = async () => {
    try {
      const { success, message } = await updateRecipeById(id, recipe);
      if (success) {
        toast({
          title: 'Recipe Updated',
          description: "Recipe has been successfully updated",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate(`/view/${id}`); 
      } else {
        toast({
          title: 'Update Failed',
          description: message || "Something went wrong",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast({
        title: 'Error',
        description: "An error occurred while updating the recipe",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  if (loading) {
    return (
      <Container maxW="container.md" py={12} textAlign="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="container.md" mt={10}>
      <VStack spacing={8}>
        <Heading as="h1" fontSize="38" textAlign={"center"} mb={8}>
          Edit Recipe
        </Heading>

        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <FormControl mb={4}>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              placeholder="Recipe Name"
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Recipe Type</FormLabel>
            <Select
              value={recipe.type}
              onChange={(e) => setRecipe({ ...recipe, type: e.target.value })}
            >
              <option value="VEG">VEG</option>
              <option value="NON-VEG">NON-VEG</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Ingredients</FormLabel>
            <Input
              placeholder="Ingredients"
              value={recipe.ingredients}
              onChange={(e) =>
                setRecipe({ ...recipe, ingredients: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Instructions</FormLabel>
            <Input
              placeholder="Instructions"
              value={recipe.instructions}
              onChange={(e) =>
                setRecipe({ ...recipe, instructions: e.target.value })
              }
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
              value={recipe.image}
              onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
            />
          </FormControl>

          <HStack justifyContent={'space-between'}>
            <Button onClick={handleUpdateRecipe} colorScheme="blue">
              Update Recipe
            </Button>
            <Button onClick={() => navigate('/')}>Cancel</Button>
          </HStack>

        </Box>
      </VStack>
    </Container>
  );
};

export default EditPage;
