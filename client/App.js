import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwYXRyaWNrYm9yZ2VsbGExIiwibmFtZSI6IlBhdHJpY2sgQm9yZ2VsbGEgSnIiLCJwYXNzd29yZCI6bnVsbCwiZW1haWwiOiJwYXRyaWNrYm9yZ2VsbGExQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMDIgMTc6NDg6NDEuNTgwICswMDowMCIsImlhdCI6MTY3Nzc4OTMwOSwiZXhwIjoxNjc4Mzk0MTA5fQ.lZ-6Aj8tmzdDQxAFZedJNBybAwWTjNRcOcr9GcuJgvc",
        },
      });
      const data = await res.json();
      console.log(data);
      // return data;
    };
    fetchData().catch();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`http://localhost:3000/cars`);
  //     const data = await res.json();
  //     setCarsList(data);
  //     setCarsFilteredList(data);
  //     console.log(data);
  //   };
  //   fetchData().catch(console.error);
  // }, []);

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
