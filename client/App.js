import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginatedItems from "./components/PaginatedItems";

const TOKEN = process.env.REACT_APP_TOKEN;
import Navbar from "./components/NavBar";
import Login from "./components/buttons/Login";

function App() {
  const [carsList, setCarsList] = useState(null);
  const [carsFilteredList, setCarsFilteredList] = useState([]);
  const [token, setToken] = useState("");

  const fetchData = async (tokenParam) => {
    if (tokenParam) {
      const res = await fetch("http://localhost:3000/cars", {
        headers: {
          Authorization: `Bearer ${tokenParam}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.error) {
            // return error for error handling
            return data;
          } else {
            setCarsList(data);
            setCarsFilteredList(data);
            return data;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      return res;
    }
  };

  useEffect(() => {
    // Handles persisting user visit through page reload
    if (token) {
      fetchData(token);
      // .catch(console.error);
    } else {
      // Renders page if token is stored in localstorage
      const handleExistingVisit = JSON.parse(localStorage.getItem("token"));
      async function handleData() {
        // Will eventually check if token is valid and handle logging user out if session has expired
        if (handleExistingVisit) {
          setToken(handleExistingVisit);
          const data = await fetchData(handleExistingVisit);
          console.log(data);
        } else {
          console.log("Not logged in");
        }
      }
      handleData();
    }
  }, [token]);

  return (
    <>
      <main>
        {!carsList ? (
          <Login setToken={setToken} />
        ) : (
          <div>
            <Navbar
              token={token}
              setToken={setToken}
              setCarsList={setCarsList}
            />
            <PaginatedItems itemsPerPage={4} carsList={carsList} />
          </div>
        )}
      </main>
    </>
  );
}

export { App };
