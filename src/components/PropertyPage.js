import { useParams, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

// ==== Styled wrappers ====
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 15px;
  text-decoration: none;
  color: #1890ff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  margin: 5px 0;
`;

const Gallery = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
`;

const GalleryImage = styled.img`
  width: 200px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  }
`;

const TabContentImage = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  margin-top: 10px;
`;

// ==== Main Component ====
function PropertyPage({ properties }) {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  // Dynamically generate image paths
  const images = Array.from({ length: property.picsCount || 6 }, (_, i) =>
    `/images/${property.id}pic${i + 1}.jpg`
  );

  return (
    <PageContainer>
      <BackLink to="/">← Back to listings</BackLink>

      <Title>{property.type} – £{property.price}</Title>
      <InfoText><strong>Bedrooms:</strong> {property.bedrooms}</InfoText>
      <InfoText><strong>Location:</strong> {property.location}</InfoText>

      {/* IMAGE GALLERY */}
      {images.length > 0 ? (
        <Gallery>
          {images.map((img, i) => (
            <GalleryImage
              key={i}
              src={img}
              alt={`Property ${i + 1}`}
              onError={(e) => e.target.style.display = "none"}
            />
          ))}
        </Gallery>
      ) : (
        <InfoText>No images available.</InfoText>
      )}

      {/* TABS */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <InfoText>{property.longDescription || "No detailed description available."}</InfoText>
        </TabPanel>

        <TabPanel>
          {property.floorPlan ? (
            <TabContentImage src={property.floorPlan} alt="Floor Plan" />
          ) : (
            <InfoText>No floor plan available.</InfoText>
          )}
        </TabPanel>

        <TabPanel>
          {property.lat && property.lng ? (
            <iframe
              title="map"
              width="100%"
              height="300"
              loading="lazy"
              src={`https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`}
              style={{ border: 0, borderRadius: "8px" }}
            />
          ) : (
            <InfoText>Map not available.</InfoText>
          )}
        </TabPanel>
      </Tabs>
    </PageContainer>
  );
}

export default PropertyPage;
