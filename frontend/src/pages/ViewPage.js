import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { crudRecipe } from "../store/recipe";
import { Box, Image, Heading, Text, Container, Spinner, VStack, HStack, Button } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";

const ViewPage = () => {
  const { id } = useParams(); // Get the recipe ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const { fetchRecipeById } = crudRecipe(); // Fetch function from store
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      const data = await fetchRecipeById(id);
      setRecipe(data);
      setLoading(false);
    };

    getRecipe();
  }, [id, fetchRecipeById]);

  if (loading) {
    return (
      <Container maxW="container.md" py={12} textAlign="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container maxW="container.md" py={12} textAlign="center">
        <Text fontSize="xl">Recipe not found</Text>
      </Container>
    );
  }

  // Function to navigate to EditPage
  const handleEditRecipe = () => {
    navigate(`/edit/${id}`); // Redirect to EditPage with the recipe ID
  };

  return (
    <Container maxW="container.md" py={12}>
      <Box shadow="lg" rounded="lg" p={6} textAlign="center">
        {recipe.image && (
          <Image src={recipe.image} alt={recipe.name} w="full" h="300px" objectFit="cover" mb={4} />
        )}
        
        <Heading as="h1" size="xl">{recipe.name}</Heading>
        <Text fontSize="25" color="gray.600" fontWeight={'bold'} mt={2}>{recipe.type}</Text>
        
        <VStack spacing={4} align="start" mt={6}>
          <Box mb={4}>
            <Heading as="h3" size="md" textAlign={"left"} mb={3}>Ingredients:</Heading>
            <Text>{recipe.ingredients}</Text>
          </Box>

          <Box mb={4}>
            <Heading as="h3" size="md" textAlign={"left"} mb={3}>Instructions:</Heading>
            <Text>{recipe.instructions}</Text>
          </Box>

          {/* Edit Button - Navigates to EditPage */}
          <HStack>
            <Button onClick={handleEditRecipe}>
              <MdModeEditOutline />
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ViewPage;
