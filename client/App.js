import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const TOKEN = process.env.REACT_APP_TOKEN;

// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";
import Navbar from "./components/NavBar";

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
    // console.log(JWT_TOKEN)
    fetchData().catch(console.error);
    console.log(carsList)
  }, []);


  function Items({ currentItems }) {
    return (
      <div className="items">
        {currentItems &&
          currentItems.map((car, idx) => (
            <div>
              <h2>
                Make:{car.make}- Color:{car.color}- Mileage:{car.mileage}- Model:
                {car.model}- Price:{car.price}
              </h2>
              <img src={car.image} alt="car" width="250" height="250"></img>
            </div>
          ))}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(carsList.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(carsList.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % carsList.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
    // return (
  //   <>
  //     <main>
  //       <h1>Auth0 Login</h1>
  //       <LoginButton />
  //       {/* <LogoutButton /> */}
  //     </main>
  //     <h1>Cars Cars come get ya cars!!</h1>
  //     {carsList &&
  //       carsList.map((car, idx) => (
  //         <div>
  //           <h2>
  //             Make:{car.make}- Color:{car.color}- Mileage:{car.mileage}- Model:
  //             {car.model}- Price:{car.price}
  //           </h2>
  //           <img src={car.image} alt="car" width="250" height="250"></img>
  //         </div>
  //       ))}
  //   </>
  // );
  return (
    <>
      <main>
        {/* <button><a href="http://localhost:3000/login">Login</a></button>
        <button><a href="http://localhost:3000/logout">Logout</a></button> */}
        <Navbar />
        {/* <h1>Auth0 Login</h1> */}
        {/* <LoginButton /> */}
        {/* <LogoutButton /> */}
      </main>
       <PaginatedItems itemsPerPage={4} />
    </>

  );

}

export { App };
