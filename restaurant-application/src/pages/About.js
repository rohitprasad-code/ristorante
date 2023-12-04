import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

import image from "../images/background.jpg"

const About = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/restaurant")
      .then((response) => setRestaurantData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!restaurantData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout
      sx={{
        backgroundImage: `url(${image})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          my: 15,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 3, flex: "1", textAlign: "center", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" } }}>
          <Typography variant="h5" gutterBottom>
            About Us
          </Typography>
          <Typography paragraph>
            {restaurantData.ambiance.description}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, flex: "1", textAlign: "center", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" } }}>
          <Typography variant="h5" gutterBottom>
            Location
          </Typography>
          <Typography paragraph>
            Address: {restaurantData.location.address}
            <br />
            Latitude: {restaurantData.location.latitude}
            <br />
            Longitude: {restaurantData.location.longitude}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, flex: "1", textAlign: "center", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" } }}>
          <Typography variant="h5" gutterBottom>
            Chef Information
          </Typography>
          <Typography paragraph>
            Chef: {restaurantData.chef.name}
            <br />
            Bio: {restaurantData.chef.bio}
            <br />
            Signature Dish: {restaurantData.chef.signature_dish}
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
};

export default About;
