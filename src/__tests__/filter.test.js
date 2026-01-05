import { filterProperties } from "../utils/filterProperties";

const properties = [
  { id: 1, type: "House", price: 500000, bedrooms: 3, postcode: "BR1" },
  { id: 2, type: "Flat", price: 300000, bedrooms: 2, postcode: "NW1" }
];

test("filters by type", () => {
  const result = filterProperties(properties, { type: "House" });
  expect(result.length).toBe(1);
});

test("filters by min price", () => {
  const result = filterProperties(properties, { minPrice: 400000 });
  expect(result.length).toBe(1);
});

test("filters by bedrooms", () => {
  const result = filterProperties(properties, { bedrooms: 2 });
  expect(result.length).toBe(2);
});

test("filters by postcode", () => {
  const result = filterProperties(properties, { postcode: "NW1" });
  expect(result[0].postcode).toBe("NW1");
});

test("combines multiple filters", () => {
  const result = filterProperties(properties, {
    type: "Flat",
    minPrice: 200000,
    bedrooms: 2
  });
  expect(result.length).toBe(1);
});
