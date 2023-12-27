import React from "react";
import SignUp from "./pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./pages/SignIn";
// import { router } from "./Navigator";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      // loader: rootLoader,
      children: [
        {
          path: "/",
          element: <Home />,
          // loader: teamLoader,
        },
        {
          path: "sign-up",
          element: <SignUp />,
          // loader: teamLoader,
        },
        {
          path: "sign-in",
          element: <SignIn />,
          // loader: teamLoader,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
