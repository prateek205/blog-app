import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyAuth } from "./AuthContext";
import useBlog from "../hooks/useBlog";
import { createSlug } from "../utils/createSlug";

export const BlogContext = createContext();

export const AddBlogContext = ({ children }) => {
  const { user } = MyAuth();

  const initialValue = { title: "", content: "" };

  const [formData, setFormData] = useState(initialValue);
  const [editData, setEditData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: blogs,
    getData,
    postData,
    updateData,
    deleteData,
  } = useBlog("http://localhost:5000/blogs");

  useEffect(() => {
    if (user) {
      getData(`?userId=${user.id}`);
    } else {
      getData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Login is required");
      return;
    }

    const newBlog = {
      ...formData,
      userId: user.id,
      slug: createSlug(formData.title),
    };

    if (editData) {
      await updateData(editData, newBlog);
      setEditData(null);
    } else {
      await postData(newBlog);
    }
    setFormData(initialValue);
    navigate("/allBlog");
    closeModal();
  };

  const handleEdit = (item) => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
    }

    setFormData({
      title: item.title,
      content: item.content,
    });

    setEditData(item.id);
    setIsEditOpen(true);
  };

  const closeModal = () => {
    setIsEditOpen(false);
    setEditData(null);
    setFormData(initialValue);
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        formData,
        updateData,
        handleSubmit,
        handleChange,
        handleEdit,
        isEditOpen,
        closeModal,
        deleteData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const MyBlogContext = () => useContext(BlogContext);
