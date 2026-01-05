import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import styled from "styled-components";

// ==== Grid container for PropertyList ====
const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
`;

// ==== Styled wrappers for individual cards ====
const CardContainer = styled.div`
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  cursor: grab;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  }
`;

const PropertyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PropertyImage = styled.img`
  width: 100%;
  max-width: 200px;
  margin-top: 10px;
  border-radius: 8px;
`;

const FavouriteButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #ff7875;
  }
`;

// ==== Sub-component for a single property ====
function PropertyItem({ property, addToFavourites }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY",
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <CardContainer ref={drag} isDragging={isDragging}>
      <PropertyLink to={`/property/${property.id}`}>
        <h3>{property.type} – £{property.price}</h3>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p>{property.shortDescription}</p>
        <PropertyImage
          src={`/images/${property.id}pic1.jpg`}
          alt="Property Thumbnail"
          onError={(e) => e.target.style.display = "none"}
        />
      </PropertyLink>
      <FavouriteButton onClick={() => addToFavourites(property)}>
        ❤️ Add to Favourites
      </FavouriteButton>
    </CardContainer>
  );
}

// ==== Main PropertyList component ====
function PropertyList({ properties, addToFavourites }) {
  return (
    <PropertyGrid>
      {properties.map((property) => (
        <PropertyItem
          key={property.id}
          property={property}
          addToFavourites={addToFavourites}
        />
      ))}
    </PropertyGrid>
  );
}

export default PropertyList;
