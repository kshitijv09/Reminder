import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Reminder from "./pages/Reminder/Reminder";

import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Reminder /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
