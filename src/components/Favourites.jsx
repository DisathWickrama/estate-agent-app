import { useDrop } from "react-dnd";

function Favourites({ favourites, removeFromFavourites, addToFavourites }) {
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
          <button onClick={() => removeFromFavourites(property.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favourites;
