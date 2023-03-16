import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginatedItems from "./components/PaginatedItems";

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import ReactLoading from 'react-loading';


// const TOKEN = process.env.REACT_APP_TOKEN;
import Navbar from "./components/NavBar";
import Login from "./components/buttons/Login";
import Signup from "./components/buttons/Signup";

import { FormGroup } from "@mui/material";
import "./style.css"


function App() {
  const [carsList, setCarsList] = useState(null);
  const [carsFilteredList, setCarsFilteredList] = useState([]);
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
          <>
            {loading && !carsList ? 
            <div className="center-screen image-screen">
              <h2>Logging in...</h2>
              <ReactLoading type={"bubbles"} color={"black"} height={'15%'} width={'15%'} />
            </div>
            : 
            <>
              <div className="center-screen image-screen">
                <div >
                  <h1>🚗 KPKar Dealership🚗</h1>
                  <p>Welcome to KPKar Dealership, a one-stop-shop for all your car needs! We sell the best quality cars with the best prices!</p>
                  <p>To checkout the latest inventory, create an account and login</p>
                </div>
                <div >
                  <Login setToken={setToken} token={token} setLoading={setLoading}/>
                  <Signup />
                </div>
              </div>
            </>
            }
          </>
        ) : (
          <div>
            <Navbar
              token={token}
              setToken={setToken}
              setCarsList={setCarsList}
              setLoading={setLoading}
            />
            <Grid container sx={{justifyContent: 'center'}}>
              <Grid sx={{ m:2, flexDirection: 'column' }}>
                <TextField id="filled-basic" label="Search" variant="filled" />
                <hr></hr>
                <h5>Make</h5>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Honda" />
                  <FormControlLabel control={<Checkbox />} label="Toyota" />
                  <FormControlLabel control={<Checkbox />} label="Cadillac" />
                  <FormControlLabel control={<Checkbox />} label="Hyundai" />
                  <FormControlLabel control={<Checkbox />} label="Subaru" />
                  <FormControlLabel control={<Checkbox />} label="Hyundai" />
                  <FormControlLabel control={<Checkbox />} label="Kia" />
                  <FormControlLabel control={<Checkbox />} label="Acura" />
                  <FormControlLabel control={<Checkbox />} label="Audi" />
                  <FormControlLabel control={<Checkbox />} label="Infiniti" />

                </FormGroup>
              </Grid>
              <Grid >
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
