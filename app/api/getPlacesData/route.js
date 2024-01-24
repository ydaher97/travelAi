// pages/api/places/attractions.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req,res) {
  try {

    const urll = new URL(req.url, process.env.NEXT_PUBLIC_APP_URL); // Replace 'http://localhost:3000' with your actual base URL
    const sw = urll.searchParams.get('sw');
    const ne = urll.searchParams.get('ne');
    
    console.log(sw, ne);
     const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

    const options = {
      params: {
        bl_latitude: sw.split(',')[0],
        bl_longitude: sw.split(',')[1],
        tr_longitude: ne.split(',')[1],
        tr_latitude: ne.split(',')[0],
        limit: 10,
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    
    try {
        const {data : {data}} = await axios.get(url,options);
        return new NextResponse(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
          });
    } catch (error) {
        console.error(error);
    }
          

   
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return new NextResponse({ error: 'Internal Server Error' }, { status: 500 });
  }
}
