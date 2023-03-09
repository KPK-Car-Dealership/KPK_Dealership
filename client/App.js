import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const TOKEN = process.env.REACT_APP_TOKEN;

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
    <div>
      <h1>Hello is this working???</h1>
      <LoginButton />
    </div>
  );
}

export { App };
