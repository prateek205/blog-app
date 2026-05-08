import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticateContext = createContext();

export const AuthContext = ({ children }) => {
  const initialValue = {
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialValue);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users", form);

      console.log("Data Added:", response.data);
      alert("Register Successfully!!!");

      setForm({ name: "", email: "", password: "" });

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Register Failed!!");
    }
  };

  useEffect(() => {
    const saveUser = JSON.parse(localStorage.getItem("user"));
    if (saveUser) {
      setUser(saveUser);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${email}&password=${password}`,
      );
      const users = res.data;

      if (users.length > 0) {
        localStorage.setItem("user", JSON.stringify(users[0]));
        setUser(users[0]);

        console.log("Login Successfully!!!")

        navigate("/");
      } else {
        alert("invalid credientials");
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  // Logout

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthenticateContext.Provider
      value={{
        login,
        setEmail,
        setPassword,
        form,
        setForm,
        register,
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};

export const MyAuth = () => useContext(AuthenticateContext);
