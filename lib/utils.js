import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function getGooglePhotoUrl(photoReference) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${apiKey}`;
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export function convertToISOString(dateString) {
  // Check if the input is already in ISO format
  const isAlreadyISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/.test(dateString);

  if (isAlreadyISO) {
    return dateString;
  }

  // If not, proceed with converting to ISO format
  const timeString = "22:00:00";
  const isoString = `${dateString}T${timeString}Z`;

  const isValid = new Date(isoString) instanceof Date && !isNaN(new Date(isoString));

  if (isValid) {
    return isoString;
  } else {
    console.error("Invalid date or time format");
    return null;
  }
}
