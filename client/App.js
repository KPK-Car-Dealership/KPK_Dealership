import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJraGFybWFsaW5hLnRvbmciLCJuYW1lIjoiS2hhcm1hbGluYSBUb25nIiwicGFzc3dvcmQiOm51bGwsImVtYWlsIjoia2hhcm1hbGluYS50b25nQHZlcml6b253aXJlbGVzcy5jb20iLCJjcmVhdGVkQXQiOiIyMDIzLTAzLTA5IDE3OjUwOjM5LjE2OCArMDA6MDAiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTA5IDE3OjUwOjM5LjE2OCArMDA6MDAiLCJpYXQiOjE2NzgzODQyNDYsImV4cCI6MTY3ODk4OTA0Nn0.gjnRZfOU7GLu-r7pO0LyVk3pDuFYb6JsMvNmcxQi5WU`,
        },
      }).then(async (response) => {
        const data = await response.json();
        // console.log(data);
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
        <h1>Auth00 Login</h1>
        {/* <LoginButton /> */}
        {/* <LogoutButton /> */}
      </main>
      <h1>Cars Cars come get ya cars!!</h1>
      {carsList && carsList.map((car, idx) => (
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
