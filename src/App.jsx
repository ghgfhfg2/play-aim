import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";
import Main from "./components/Main";

function App() {
  return (
    <ChakraProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
