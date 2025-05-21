import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration
} from "react-router-dom";
import { productsData } from "./componets/api/api";
import Footer from "./componets/Footer/Footer";
import Header from "./componets/Header/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import Regestration from"./pages/Regestration"


const Layout =()=>{
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={productsData}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
      <Route path="/SignIn" element={<SignIn />}></Route>
      <Route path="/Regestration" element={<Regestration />}></Route>
      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
<RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;