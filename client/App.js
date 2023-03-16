import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginatedItems from "./components/PaginatedItems";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



// const TOKEN = process.env.REACT_APP_TOKEN;
import Navbar from "./components/NavBar";
import Login from "./components/buttons/Login";
import Signup from "./components/buttons/Signup";
import { FormGroup } from "@mui/material";

function App() {
  const [carsList, setCarsList] = useState(null);
  const [carsFilteredList, setCarsFilteredList] = useState([]);
  const [token, setToken] = useState("");

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
            setCarsList(data);
            setCarsFilteredList(data);
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
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   const regex = RegExp(value, "gi");
  //   const filteredList = pokemonList.filter((newList) => {
  //     return newList.name.match(regex);
  //   });
  //   setPokemonFilteredList(filteredList);
  // };

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
          console.log(data);
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
        {!carsList ? (
          <div>
            <div className="d-flex align-items-center justify-content-center">
              <h1>🚗 Welcome to KPK 🚗</h1>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Login setToken={setToken} token={token} />
              <Signup />
            </div>
          </div>
        ) : (
          <div>
            <Navbar
              token={token}
              setToken={setToken}
              setCarsList={setCarsList}
            />
            <Grid container >
              <Grid xs={4} sx={{ m: 2, position: 'fixed' }}>
                {/* <FormGroup> */}
                  <TextField id="filled-basic" label="Search" variant="filled" />
                  <Button variant="outlined" size="small">Calculate Payment</Button>
                  <Button variant="outlined" size="small">Calculate Payment</Button>
                  <Button variant="outlined" size="small">Calculate Payment</Button>
                  <Button variant="outlined" size="small">Calculate Payment</Button>
                  {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
                {/* </FormGroup> */}
              </Grid>
              <Grid xs={8}>
                <PaginatedItems sx={{ m: 2 }} itemsPerPage={4} carsList={carsList} />
              </Grid>
            </Grid>
          </div>
        )}
      </main>
    </>
  );
}

export { App };
