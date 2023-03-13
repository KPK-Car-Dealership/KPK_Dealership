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



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("http://localhost:3000/cars", {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXRyaWNrYm9yZ2VsbGExIiwibmFtZSI6IlBhdHJpY2sgQm9yZ2VsbGEgSnIiLCJwYXNzd29yZCI6bnVsbCwiZW1haWwiOiJwYXRyaWNrYm9yZ2VsbGExQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsImlhdCI6MTY3ODM4MzMxMSwiZXhwIjoxNjc4OTg4MTExfQ.hlyEkf37biSiCS7VRavS-c14m1ornBHQ1QGqTml_234`,
  //       },
  //     }).then(async (response) => {
  //       const data = await response.json();
  //       console.log(data);
  //       setCarsList(data);
  //       setCarsFilteredList(data);
  //     });
  //   };
  //   // console.log(JWT_TOKEN)
  //   fetchData().catch(console.error);
  //   console.log(carsList)
  // }, []);

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
      // console.log(JWT_TOKEN)
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
              <Login setToken={setToken} token={token}/>
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
