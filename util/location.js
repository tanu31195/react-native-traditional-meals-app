import useFetch from "../hook/useFetch";

// TODO
const GOOGLE_API_KEY = "AIzaSyBPHK6juDVpxjfZ_1Ej-sa-Yd8jK2XWojg";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  // const response = await useFetch(url, { other: true });
  const response = await fetch(url);

  // if (response.error) {
  //   throw new Error("Failed to fetch address!");
  // }

  // const data = await response.data.json();
  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
}
