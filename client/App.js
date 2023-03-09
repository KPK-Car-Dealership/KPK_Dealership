import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const JWT_TOKEN = process.env.REACT_APP_TOKEN;

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [carsList, setCarsList] = useState([]);
  const [carsFilteredList, setCarsFilteredList] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/cars", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXRyaWNrYm9yZ2VsbGExIiwibmFtZSI6IlBhdHJpY2sgQm9yZ2VsbGEgSnIiLCJwYXNzd29yZCI6bnVsbCwiZW1haWwiOiJwYXRyaWNrYm9yZ2VsbGExQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsImlhdCI6MTY3ODM4MzMxMSwiZXhwIjoxNjc4OTg4MTExfQ.hlyEkf37biSiCS7VRavS-c14m1ornBHQ1QGqTml_234`,
        },
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
        setCarsList(data);
        setCarsFilteredList(data);
      });
    };
    console.log(JWT_TOKEN)
    fetchData().catch(console.error);
    console.log(carsList)
  }, []);

  return (
    <>
      <main>
        <h1>Auth0 Login</h1>
        <LoginButton />
        {/* <LogoutButton /> */}
      </main>
      <h1>Cars Cars come get ya cars!!</h1>
      {carsList &&
        carsList.map((car, idx) => (
          <div>
            <h2>
              Make:{car.make}- Color:{car.color}- Mileage:{car.mileage}- Model:
              {car.model}- Price:{car.price}
            </h2>
            <img src={car.image} alt="car" width="250" height="250"></img>
          </div>
        ))}
    </>
  );
}

export { App };
