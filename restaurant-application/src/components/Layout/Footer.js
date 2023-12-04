import React, { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from '@mui/icons-material/Facebook';
import HttpIcon from '@mui/icons-material/Http';
import DirectionsIcon from '@mui/icons-material/Directions';


import { Box, Typography } from "@mui/material";
import axios from "axios";

const Footer = () => {
  const [onlinePresence, setOnlinePresence] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/restaurant")
      .then((response) => setOnlinePresence(response.data))
      .catch((error) => console.error("Error fetching online presence data:", error));
  }, []);

  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  if (!onlinePresence) {
    return null;
  }

  const handelDirectionClick = () => {
    const latitude=onlinePresence.location.latitude;
    const longitude=onlinePresence.location.longitude;

    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");


  };

  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            "& svg": {
              fontSize: "60px",
              cursor: "pointer",
              mr: 2,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        >
          {/* icons */}
          <InstagramIcon onClick={() => handleIconClick(onlinePresence.online_presence.social_media.instagram)} />
          <TwitterIcon onClick={() => handleIconClick(onlinePresence.online_presence.social_media.twitter)} />
          <HttpIcon onClick={() => handleIconClick(onlinePresence.online_presence.website)} />
          <FacebookIcon onClick={() => handleIconClick(onlinePresence.online_presence.social_media.facebook)} />
          <DirectionsIcon onClick={handelDirectionClick} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            "@media (max-width:600px)": {
              fontSize: "1rem",
            },
          }}
        >

        </Typography>
      </Box>
    </>
  );
};

export default Footer;
