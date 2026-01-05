import { useState, useEffect } from "react";
import PropertyList from "./components/PropertyList";
import SearchBar from "./components/SearchBar";
import Favourites from "./components/Favourites";
import propertiesData from "./data/properties.json";
import { Routes, Route } from "react-router-dom";
import PropertyPage from "./components/PropertyPage";

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

  return (
    <div>
      <h1>Estate Agent App</h1>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar filters={filters} setFilters={setFilters} />
              <PropertyList properties={filteredProperties} addToFavourites={addToFavourites} />
              <Favourites
                favourites={favourites}
                removeFromFavourites={removeFromFavourites}
                addToFavourites={addToFavourites}
              />
            </>
          }
        />
        <Route
          path="/property/:id"
          element={<PropertyPage properties={propertiesData.properties} />}
        />
      </Routes>
    </div>
  );
}

export default App;
