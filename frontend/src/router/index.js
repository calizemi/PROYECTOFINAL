import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppContext from "../context/AppContext";
import Context from "../context/UserContext";
import ShippContext from "../context/ShippingContext";
import PaymentContext from "../context/PaymentContext";

import useUser from "../hooks/useUser";
import useInitialState from "../hooks/useInitialState";
import useShipping from "../hooks/useShipping";
import usePayment from "../hooks/usePayment";

import Tienda from "../pages/Tienda";
import Detail from "../pages/Detail";
import Navbar from "../components/NavBar";
import SignUp from "../pages/SignUp";
import Activate from "../pages/Activate";
//importanto home
import Home from "../pages/Home/home";
import Order from "../pages/Order/Index";
import NotFound from "../pages/NotFound";

import Blog from "../pages/Blog";
import Panel from "../pages/Panel/Panel"
import Nosotros from "../pages/Nosotros";


const Router = () => {
  const initialState = useInitialState();
  const userInitialState = useUser();
  const shippingInitialState = useShipping();
  const paymentInitialState = usePayment();

  return (
    <Context.Provider value={userInitialState}>
      <AppContext.Provider value={initialState}>
      <ShippContext.Provider value={shippingInitialState}>
      <PaymentContext.Provider value={paymentInitialState}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />} />

              <Route path="/tienda" element={<Tienda />} />

              <Route path="/tienda/detalles/:id" element={<Detail />} />
              {/* Authentication */}
              <Route exact path="/signup" element={<SignUp />} />
              <Route
                exact
                path="/activate/:uid/:token"
                element={<Activate />}
              />
              <Route path="/panel" element={<Panel/>}/>
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/nosotros" element={<Nosotros />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PaymentContext.Provider>
      </ShippContext.Provider>
      </AppContext.Provider>
    </Context.Provider>
  );
};

export default Router;
