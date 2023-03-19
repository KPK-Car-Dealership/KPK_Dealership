import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import LoginRegisterPage from "./components/LoginRegisterPage";
import Sidebar from "./components/Sidebar";

function App() {
  const [carsList, setCarsList] = useState(null);
  const [carsFilteredList, setCarsFilteredList] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (tokenParam) => {
    if (tokenParam) {
      const res = await fetch("https://kpk-car-dealership.onrender.com/cars", {
        headers: {
          Authorization: `Bearer ${tokenParam}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.error) {
            // return error for error handling
            return data;
          } else {
            data.map((car) => {
              car.name = `${car.year} ${car.make} ${car.model}`;
            });
            setCarsList(data);
            setCarsFilteredList(data);
            console.log(data);
            return data;
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      return res;
    }
  };

  // Handles search functionality
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const regex = RegExp(value, "gi");
    const filteredList = carsList.filter((newList) => {
      return newList.name.match(regex);
    });

    setCarsFilteredList([...filteredList]);
  };
  const handleCheck = (e) => {
    e.preventDefault();
    console.log(e.target.checked);
    if (e.target.checked) {
      const value = e.target.name;
      // console.log(value);
      const regex = RegExp(value, "gi");
      const filteredList = carsList.filter((newList) => {
        return newList.name.match(regex);
      });
      console.log(filteredList);
      // Checks if a make has already been selected before filtering results
      if (carsFilteredList.length != carsList.length) {
        setCarsFilteredList([...filteredList, ...carsFilteredList]);
      } else {
        setCarsFilteredList([...filteredList]);
      }
    } else {
      // Need to make uncheck remove cars by each checkbox instead of resetting to default instantly
      setCarsFilteredList(carsList);
    }
  };

  // useEffect(() => {
  //   if (carsList?.length == carsFilteredList?.length) {
  //     console.log("");
  //   } else {
  //     console.log(carsFilteredList);
  //   }
  // }, [carsFilteredList]);

  useEffect(() => {
    // Handles persisting user visit through page reload
    if (token) {
      fetchData(token);
    } else {
      // Renders page if token is stored in localstorage
      const handleExistingVisit = JSON.parse(localStorage.getItem("token"));
      async function handleExistingData() {
        // Will eventually check if token is valid and handle logging user out if session has expired
        if (handleExistingVisit) {
          setToken(handleExistingVisit);
          const data = await fetchData(handleExistingVisit);
          // console.log(data);
        } else {
          console.log("Not logged in");
        }
      }
      handleExistingData();
    }
  }, [token]);

  return (
    <>
      <main>
        <Routes>
          {!carsFilteredList ? (
            <Route
              exact
              path="/"
              element={
                <LoginRegisterPage
                  loading={loading}
                  setToken={setToken}
                  setLoading={setLoading}
                />
              }
            />
          ) : (
            <Route
              path="/home"
              element={[
                <Navbar
                  setToken={setToken}
                  setCarsList={setCarsList}
                  setCarsFilteredList={setCarsFilteredList}
                  setLoading={setLoading}
                />,
                <Sidebar
                  handleChange={handleChange}
                  handleCheck={handleCheck}
                  carsFilteredList={carsFilteredList}
                />,
              ]}
            />
          )}
        </Routes>
      </main>
    </>
  );
}

export { App };
