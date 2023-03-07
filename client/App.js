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
    <h1>Hello is this working???</h1>
  );
}

export { App };
