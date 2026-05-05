import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import Blog from "./pages/Blog";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ProtectedRoute from "./pages/users/ProtectedRoute";
import Profile from "./pages/users/Profile";
import EditPage from "./model/EditPage";
import BlogDetails from "./pages/BlogDetails";
import AllBlog from "./pages/AllBlog";

const App = () => {
  return (
    <section className="h-full w-full bg-white text-black font-fontFamily">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/allBlog"
          element={
            <ProtectedRoute>
              <AllBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/blogDetails/:id/:slug" element={<BlogDetails />} />
      </Routes>
      <EditPage />
      <Footer />
    </section>
  );
};

export default App;
