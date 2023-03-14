import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginatedItems from "./components/PaginatedItems";

// const TOKEN = process.env.REACT_APP_TOKEN;
import Navbar from "./components/NavBar";
import Login from "./components/buttons/Login";
import Signup from "./components/buttons/Signup";

function App() {
  const [carsList, setCarsList] = useState(null);
  const [carsFilteredList, setCarsFilteredList] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if(token) {
      const fetchData = async () => {
        const res = await fetch("http://localhost:3000/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(async (response) => {
          const data = await response.json();
          console.log(data);
          setCarsList(data);
          setCarsFilteredList(data);
        });
      };
      fetchData().catch(console.error);
      console.log(carsList)
      console.log(token);
    }
  }, [token])

    return (
      <>       
        <main>
          {
            !carsList ? (
              <div >
                <div className="d-flex align-items-center justify-content-center">
                  <h1>🚗 Welcome to KPK 🚗</h1>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Login setToken={setToken} token={token} />
                  <Signup />
                </div>
              </div>
            ) : 
              <div>
                <Navbar />
                <PaginatedItems itemsPerPage={4} carsList={carsList}/>
              </div>
          }
        </main>
      </>
  
    );
  }

export { App };
