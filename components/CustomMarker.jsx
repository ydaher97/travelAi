"use client"
import React , {useEffect}from 'react';
import { MapPin } from 'lucide-react';

const CustomMarker = ({ text }) =>{
 console.log(text)
    return(
  <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
    <MapPin width={20} height={20} color='#FF0000' />
    <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#000', textAlign: 'center' }}>{text}</div>
  </div>
)};

export default CustomMarker;
