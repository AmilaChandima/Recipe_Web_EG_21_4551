import { Button, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";

const NavBar = () => {
  return (
    <Box 
      as="nav"
      position="fixed" 
      top="0"
      left="0"
      width="100%" 
      bg="white"
      zIndex="1000"
      boxShadow="md"
      p={4}
    >
      <Flex 
        maxW="1300px" 
        mx="auto" 
        alignItems="center" 
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "30px", sm: "40px" }}
          color="red"
          fontWeight="extrabold"
          display="inline-flex"
          alignItems="center"
          gap={2}
        >
          <Link to="/">Recipe Warden</Link>
          <LuChefHat />
        </Text>

        <Button>
          <Link to="/create">ADD RECIPE</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;
