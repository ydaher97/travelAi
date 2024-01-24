import { NextResponse } from "next/server";

import axios from 'axios';

export  async function GET(req, res) {
  try {
    const url = new URL(req.url, process.env.NEXT_PUBLIC_APP_URL);
    const place_id = url.searchParams.get('place_id');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACES;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`
    );

    return NextResponse.json(response.data,{status:200});

  } catch (error) {
    console.error('Error fetching place details:', error);
    return new NextResponse("Internal Error", { status: 500 });
}
}
