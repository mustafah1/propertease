import React, { useEffect, useState, createContext, useContext } from "react";
import Modal from "../Modal";
import NewRequestForm from "../NewRequestForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CurrentElemIdContext from "../../context/CurrentElemIdContext";

//import { useNavigate } from "react-router-dom";
//import { useAuthContext } from '../../hooks/useAuthContext';

import { Box } from "@mui/system";
//import styles from "../Modal/Modal.module.css";

const PropertiesMenu = ({ properties }) => {
  const [elementId, setElementId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  //const { user } = useAuthContext();

  //const navigate = useNavigate();
  console.log("properties from properties menu " , properties);

  const removeNullUndefinedKeys = (obj) => {
    const newObj = { ...obj };
    delete newObj.psets;
    delete newObj.mats;
    delete newObj.type;
    return newObj;
  };

  //edited to remove null & undefined values
  const createPropertyRow = (key, value) => {
    if (value === null || value === undefined) {
      return null;
    } else if (value.value) {
      value = value.value;
    }
  
    return (
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };
  

  const renderPropertyRows = (properties) => {
    const filteredProperties = removeNullUndefinedKeys(properties);
    return Object.entries(filteredProperties).map(([key, value]) =>
      createPropertyRow(key, value)
    );
  };

  const handleClick = () => {
    for (let i = 0; i < Object.keys(properties).length; i++) {
      if (Object.keys(properties)[i] === "expressID") {
        const locationId = Object.values(properties)[i];
        console.log("locationId from PropertiesMenu", locationId);
        setElementId(locationId);
      }
    }
    setIsOpen(true);
  };

  useEffect(() => {}, [properties]);

  const propertyRows = renderPropertyRows(properties);

  return (
    <>
      <div></div>
      <CurrentElemIdContext.Provider value={elementId}>
        {isOpen && (
          <Modal
            children={<NewRequestForm value={elementId} />}
            setIsOpen={setIsOpen}
          />
        )}
      </CurrentElemIdContext.Provider>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          bottom: "0.5rem",
          right: "0.5rem",
          width: "30rem",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Table>
            <TableBody>{propertyRows}</TableBody>
          </Table>
        </Box>
        <div align="center">
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                handleClick();
              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Create Maintenance request
            </Button>
          </Box>
          {/* <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                alert("Maintenance request closed")
              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Close Maintenance request
            </Button>
          </Box> */}
          {/* <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                console.log("go back to dashboard");
                user.user_type ? navigate (`/${user.user_type}`) : "" 

              }}
              sx={{ backgroundColor: "rgb(26, 39, 62)", color: "#ffffff" }}
            >
              Dashboard
            </Button>
          </Box> */}
          {/* <Box  >
            <Button variant="contained" onClick={() => {propertyMenuVisible=!propertyMenuVisible
            console.log(propertyMenuVisible)}}>x</Button>
          </Box> */}
        </div>
      </TableContainer>
    </>
  );
};

export default PropertiesMenu;
