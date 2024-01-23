// // pages/api/places/attractions.js
// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function GET(req) {
//   try {
//     const url = new URL(req.url, 'http://localhost:3000');
//     const query = url.searchParams.get('query');
    
//     if (!query) {
//       return new NextResponse({ error: 'Missing query parameter' }, { status: 400 });
//     }
    
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES;

//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&language=en&key=${apiKey}`
//     );
//     const results = response.data.results;

//     // Iterate through each result and fetch price level
//     const detailedResults = await Promise.all(
//       results.map(async (result) => {
//           try {
//               const detailsResponse = await axios.get(
//                   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=price_level&key=${apiKey}`
//               );
  
//               const priceLevel = detailsResponse.data.result?.price_level; // Check if price_level exists
//               return {
//                   ...result,
//                   price_level: priceLevel
//               };
//           } catch (error) {
//               console.error('Error fetching details for place', result.place_id, error);
//               return {
//                   ...result,
//                   price_level: null, // Or a default value indicating unavailable price
//                   error: 'Failed to retrieve price information'
//               };
//           }
//       })
//   );

//     return new NextResponse(JSON.stringify(detailedResults), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error fetching attractions:', error);
//     return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
