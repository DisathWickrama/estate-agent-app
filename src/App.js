import { useState, useEffect } from "react";
import PropertyList from "./components/PropertyList";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import propertiesData from "./data/properties.json";
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";
import styled, { createGlobalStyle } from "styled-components";

// ==== Global styles ====
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f5f5;
    color: #333;
  }

  h1, h2, h3, h4 {
    margin: 0.5em 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }
`;

// ==== App layout ====
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #1890ff;
  margin-bottom: 20px;
`;

const HomeLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

function App() {
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    postcode: "",
    dateAdded: null
  });

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const filteredProperties = propertiesData.properties.filter((p) => {
    const typeMatch = !filters.type || p.type === filters.type;
    const minPriceMatch = !filters.minPrice || p.price >= Number(filters.minPrice);
    const maxPriceMatch = !filters.maxPrice || p.price <= Number(filters.maxPrice);
    const bedroomsMatch = !filters.bedrooms || p.bedrooms >= Number(filters.bedrooms);
    const postcodeMatch = !filters.postcode || p.location.toLowerCase().includes(filters.postcode.toLowerCase());
    const dateMatch = !filters.dateAdded || new Date(p.added) >= new Date(filters.dateAdded);

    return typeMatch && minPriceMatch && maxPriceMatch && bedroomsMatch && postcodeMatch && dateMatch;
  });

  const addToFavourites = (p) => {
    setFavourites((prev) => (prev.find((f) => f.id === p.id) ? prev : [...prev, p]));
  };

  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => setFavourites([]);

  return (
    <AppContainer>
      <GlobalStyle />
      <Header>Estate Agent App</Header>

      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <div>
                <SearchBar filters={filters} setFilters={setFilters} />
                <PropertyList properties={filteredProperties} addToFavourites={addToFavourites} />
              </div>

              <Favourites
                favourites={favourites}
                removeFromFavourites={removeFromFavourites}
                addToFavourites={addToFavourites}
                clearFavourites={clearFavourites}
              />
            </HomeLayout>
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyPage properties={propertiesData.properties} />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
