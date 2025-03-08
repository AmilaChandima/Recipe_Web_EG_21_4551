import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import ViewPage from "./pages/ViewPage"; 
import NavBar from "./components/NavBar";
import EditPage from "./pages/EditPage";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <>
      <NavBar />
      <Box paddingTop="100px">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/view/:id" element={<ViewPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
