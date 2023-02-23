import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App () {

    // const [userList, setUserList] = useState([]);
    // const [userFilteredList, setUserFilteredList] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     const res = await fetch(disneyCharApi);
    //     const data = await res.json();
    //     setUserList(data.data);
    //     setUserFilteredList(data.data);
    //     console.log(userList);
    //     // console.log(typeof cards);
    //   }
    //     fetchData()
    //       .catch(console.error);
    //     }, []);

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
    )
}

export { App };