import { Box, Button, Heading, HStack, Image, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../services/recipeService";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleDeleteRecipe = async (id) => {
    const isConfirmed = window.confirm("DO YOU REALLY WANT TO DELETE THIS RECIPE?");
    
    if (isConfirmed) {
      try {
        await deleteRecipe(id);

        toast({
          title: "Recipe deleted",
          description: "Recipe has been successfully deleted",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        window.location.reload();

      } catch (error) {
        console.error("Error deleting recipe:", error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the recipe",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleViewRecipe = () => {
    navigate(`/view/${recipe._id}`);
  };

  const handleEditRecipe = (e) => {
    e.stopPropagation(); 
    navigate(`/edit/${recipe._id}`);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      onClick={handleViewRecipe} 
      cursor="pointer"
    >
      <Image src={recipe.image} alt={recipe.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {recipe.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color="black" mb={4}>
          {recipe.type}
        </Text>
        <HStack spacing={2}>
          <Button onClick={handleEditRecipe}>
            <MdModeEditOutline />
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation(); 
            handleDeleteRecipe(recipe._id);
          }}>
            <MdDeleteOutline />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default RecipeCard;
