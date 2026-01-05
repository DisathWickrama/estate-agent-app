import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar({ filters, setFilters }) {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>Search Properties</h3>

      {/* Property Type Filter */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Type:
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </label>

      {/* Price Filters */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Min Price:
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
          style={{ marginLeft: "10px", width: "100px" }}
        />
      </label>

      <label style={{ display: "block", marginBottom: "10px" }}>
        Max Price:
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          style={{ marginLeft: "10px", width: "100px" }}
        />
      </label>

      {/* Bedrooms Filter */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Bedrooms (Min):
        <input
          type="number"
          value={filters.bedrooms}
          onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          style={{ marginLeft: "10px", width: "50px" }}
        />
      </label>

      {/* Postcode Filter */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Postcode:
        <input
          type="text"
          value={filters.postcode || ""}
          onChange={(e) =>
            setFilters({ ...filters, postcode: e.target.value })
          }
          style={{ marginLeft: "10px", width: "100px" }}
          placeholder="e.g., BR5"
        />
      </label>

      {/* Date Added Filter */}
      <label style={{ display: "block", marginBottom: "10px" }}>
        Added After:
        <DatePicker
          selected={filters.dateAdded}
          onChange={(date) => setFilters({ ...filters, dateAdded: date })}
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
          style={{ marginLeft: "10px" }}
        />
      </label>
    </div>
  );
}

export default SearchBar;
