import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Awards = () => {
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
    <Layout>
      <Box
        sx={{
          my: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "center",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
      >
        <Typography variant="h4" sx={{color:'#FAEED1'}}>AWARD</Typography>
        <p style={{color:'#FAEED1'}}>Award-winning restaurant</p>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",

        }}
      >
        {restaurantData.awards.map((award, index) => (
          <Card key={index} sx={{ my: 2, flex: "0 0 30%", maxWidth: 300 }}>
            <CardContent >
              <EmojiEventsIcon sx={{fontSize:'50px' }}/>
              <Typography variant="h6">{award.organization}</Typography>
              <Typography variant="body1">{award.award}</Typography>
              <Typography variant="caption">Year: {award.year}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Awards;
