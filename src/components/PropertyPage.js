import { useParams, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PropertyPage({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "15px" }}>
        ← Back to listings
      </Link>

      <h2>{property.type} – £{property.price}</h2>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Location:</strong> {property.location}</p>

      {property.images?.length > 0 ? (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "15px 0" }}>
          {property.images.map((img, i) => (
            <img key={i} src={img} alt={`Property ${i + 1}`} style={{ width: "200px", cursor: "pointer" }} />
          ))}
        </div>
      ) : <p>No images available.</p>}

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.longDescription || "No detailed description available."}</p>
        </TabPanel>

        <TabPanel>
          {property.floorPlan ? (
            <img src={property.floorPlan} alt="Floor Plan" style={{ width: "100%", maxWidth: "600px" }} />
          ) : <p>No floor plan available.</p>}
        </TabPanel>

        <TabPanel>
          {property.lat && property.lng ? (
            <iframe
              title="map"
              width="100%"
              height="300"
              loading="lazy"
              src={`https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`}
            />
          ) : <p>Map not available.</p>}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
