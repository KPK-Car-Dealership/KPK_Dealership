import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PaginatedItems from "./PaginatedItems";

function Sidebar({ carsFilteredList, handleChange }) {
  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid sx={{ m: 2, flexDirection: "column" }}>
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            type="search"
            onChange={handleChange}
          />
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
        <Grid>
          <PaginatedItems
            sx={{ m: 2 }}
            itemsPerPage={4}
            carsFilteredList={carsFilteredList}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Sidebar;
