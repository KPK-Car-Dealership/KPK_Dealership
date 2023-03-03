import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [carsList, setCarsList] = useState([]);
  const [carsFilteredList, setCarsFilteredList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/cars", {
        method: "GET",
        withCredentials: true,
        crossorigin: true,
        headers: {
          Authorization:
            `Bearer ${JWT_TOKEN}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setCarsList(data);
      console.log(carsList)
    };
    fetchData().catch();
  }, []);

  return (
    <>
      <main>
        <h1>Auth0 Login</h1>
        <LoginButton />
        <LogoutButton />
      </main>
      <h1>Cars Cars come get ya cars!!</h1>
      {carsList.map((car, idx) => (
        <div>
          <h2>Make:{car.make}- Color:{car.color}- Mileage:{car.mileage}- Model:{car.model}- Price:{car.price}</h2>
          <img src={car.image} alt="car" width="250" height="250"></img>
        </div>
      ))}
    </>

  );
}

export { App };


    // <FavoritesProvider>
    //     <BrowserRouter>
    //         <div data-testid="app">
    //             <Navigation />
    //             <Routes>
    //                 {/* <Route path="/" element={<Home userList={userList} userFilteredList={userFilteredList} setUserFilteredList={setUserFilteredList}/>} />
    //                 <Route path="/characters/:_id" element={<UserDetails userFilteredList={userFilteredList}/>} />
    //                 <Route path="/favorites" element={<FavCharacters />} /> */}
    //                 <Route path="/" />
    //             </Routes>
    //         </div>
    //     </BrowserRouter>
    // </FavoritesProvider>