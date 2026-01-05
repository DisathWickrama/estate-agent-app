import { useDrop } from "react-dnd";

function Favourites({ favourites, removeFromFavourites, addToFavourites, clearFavourites }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",
    drop: (item) => addToFavourites(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed #333",
        padding: "20px",
        background: isOver ? "#f0f8ff" : "#fff",
        marginTop: "20px"
      }}
    >
      <h2>⭐ Favourites (Drag properties here)</h2>

      {favourites.length === 0 && <p>No favourites yet.</p>}

      {favourites.length > 0 && (
        <button
          onClick={clearFavourites}
          style={{
            marginBottom: "15px",
            padding: "8px 12px",
            background: "#ff4d4f",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Remove All
        </button>
      )}

      {favourites.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <h4>{property.type} - £{property.price}</h4>
          <p>{property.location}</p>
          <button
            onClick={() => removeFromFavourites(property.id)}
            style={{
              padding: "5px 10px",
              background: "#f0f0f0",
              border: "1px solid #ccc",
              cursor: "pointer"
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favourites;
