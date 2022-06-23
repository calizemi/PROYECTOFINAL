import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

import Tienda from "../pages/Tienda";
import Detail from "../pages/Detail";
import Navbar from "../components/NavBar";
import SignUp from "../pages/SignUp"
//importanto home
import Home from "../pages/Home/home";
import Order from "../pages/Order/Index";
import NotFound from '../pages/NotFound'

import Blog from "../pages/Blog";

import Nosotros from "../pages/Nosotros";


const Router = () => {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home/>} />
            <Route path="/tienda" element={<Tienda/>} />
            <Route path="/tienda/detalles/:id" element={<Detail/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/blog" element={<Blog />} />  
        <Route path="/nosotros" element={<Nosotros />} />  
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;
