import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

function PropertyCard({ property, addToFavourites }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY",
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        cursor: "grab",
      }}
    >
      <Link
        to={`/property/${property.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>
          {property.type} – £{property.price}
        </h3>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p>{property.shortDescription}</p> {/* ✅ Added shortDescription */}
        {property.images && property.images.length > 0 && (
          <img
            src={property.images[0]}
            alt="Property Thumbnail"
            style={{ width: "100%", maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </Link>

      <button onClick={() => addToFavourites(property)} style={{ marginTop: "10px" }}>
        ❤️ Add to Favourites
      </button>
    </div>
  );
}

function PropertyList({ properties, addToFavourites }) {
  return (
    <div>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          addToFavourites={addToFavourites}
        />
      ))}
    </div>
  );
}

export default PropertyList;
