import React, { useEffect, useState } from "react";

const useBlog = (url) => {
  const [data, setData] = useState([]);

  // GET DATA
  const getData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
    console.log("Data:", data);
  };

  // POST DATA

  const postData = async (newData) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    const data = await response.json();
    console.log("New Data:", data);
    setData((prev) => [...prev, data]);
  };

  //   UPDATE DATA
  const updateData = async (id, updateItem) => {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateItem),
    });

    const data = await res.json();
    setData((prev) => prev.map((item) => (item.id === id ? data : item)));
  };

  //   DELETE DATA

  const deleteData = async (id) => {
    const deleteItems = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    const updateData = blogs.filter((item) => item.id !== id) 
    setData(updateData);
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { data, getData, postData, updateData, deleteData };
};

export default useBlog;
