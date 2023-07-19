'use client';

import { useEffect, useRef } from 'react';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  mapStyleCommon?: string;
  initCoordinate: [number, number];
}

const Map: React.FC<MapProps> = ({ mapStyleCommon, initCoordinate }) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: initCoordinate,
        zoom: 12,
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'bottom-right');
    }
  }, [initCoordinate]);

  return (
    <div className={`w-full ${mapStyleCommon}`}>
      <div className='map-container' ref={mapContainer} />
    </div>
  );
};
export default Map;
