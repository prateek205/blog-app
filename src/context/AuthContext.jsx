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

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log("data added:", data);

    if (response.ok) {
      alert("Register is Successfully!!!");
      navigate("/login");
    } else {
      alert("Register is Failed!!");
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

    const res = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`,
    );
    const users = await res.json();
    // console.log("user Data:", users);

    if (users.length > 0) {
      localStorage.setItem("user", JSON.stringify(users[0]));
      setUser(users[0]);

      navigate("/");
    } else {
      alert("invalid credientials");
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
