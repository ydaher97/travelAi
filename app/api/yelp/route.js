
// import axios from 'axios';
// import { NextResponse } from "next/server";

// export  async function GET(req, res) {
//   try {
//     const { term, location } = req.query;

//     // Make a GET request to Yelp API
//     const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
//       params: {
//         term,
//         location,
//       },
//       headers: {
//         Authorization: process.env.YELP_API_KEY,
//       },
//     });

//     const businesses = response.data.businesses;

//     return NextResponse.json(businesses, {status:200});
// } catch (error) {
//     console.error('Error fetching data from Yelp API:', error);
//     return new NextResponse("Internal Error", { status: 500 });
// }
// }
