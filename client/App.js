import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
const JWT_TOKEN = process.env.REACT_APP_JWT_TOKEN;

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
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      }).then(async (response) => {
        const data = await response.json();
        console.log(data);
      });
      const data = await res.json();
      setCarsList(data);
      setCarsFilteredList(data);
      console.log(data);
    };
    fetchData().catch(console.error);
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
    <div>
      <h1>Hello is this working???</h1>
      <LoginButton />
    </div>
  );
}

export { App };
