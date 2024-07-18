import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "../store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddPost,
  AllPost,
  EditPost,
  Home,
  Signup,
  Post
} from "./pages/index.js";
import { Protected, Login } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
         path: "/", 
         element: <Home /> 
      },
      {
        path: "/login",
    
        element: (
          <Protected authentication={false}>
          <Login />
      </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
          <Signup />
      </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
        <Protected authentication>
          {" "}
          <AddPost />,
        </Protected>)
      },
      {
        path: "/all-post",
        // element: <AllPost/>
        element: (
        <Protected authentication>
            {" "}
          <AllPost />,
        </Protected>)
      },
      {
        path: "/edit-post/:slug",
   

        element: (
        <Protected authentication>
            {" "}
          <EditPost />,
        </Protected>)
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }
    
    
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);
