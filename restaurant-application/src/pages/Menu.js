
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [seasonFilter, setSeasonFilter] = useState("All");
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    axios.get("http://localhost:4000/restaurant")
      .then(response => setMenuList(response.data.menu.categories))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredMenu = menuList.reduce((acc, category) => {
    const filteredItems = category.items.filter(item => {
      if (seasonFilter === "All") {
        return true; 
      } else {
        return item.seasonal_availability && item.seasonal_availability.includes(seasonFilter);
      }
    });
    if (filteredItems.length > 0) {
      acc.push({ ...category, items: filteredItems });
    }
    return acc;
  }, []);

  const sortedMenu = filteredMenu.map(category => ({
    ...category,
    items: [...category.items].sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    }),
  }));

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
          <InputLabel>Filter by Season</InputLabel>
          <Select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
          >
            <MenuItem value="All">All Seasons</MenuItem>
            <MenuItem value="Fall">Fall</MenuItem>
            <MenuItem value="Summer">Summer</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {sortedMenu.map((category) => (
            <Card key={category.name} sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
              <CardActionArea>
                {category.items.length > 0 && (
                  <CardMedia
                    sx={{ minHeight: "400px" }}
                    component={"img"}
                    src={category.items[0].image || "default-image-url"} 
                    alt={category.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" gutterBottom component={"div"}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2">{category.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Menu;
