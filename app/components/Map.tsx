'use client';

import { useEffect, useRef } from 'react';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { MapListing } from '@/types/RentTypes';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

interface MarkerObject {
  marker: mapboxgl.Marker;
}

interface MapProps {
  mapStyleCommon?: string;
  initCoordinate: [number, number];
  rentmain?: boolean;
  showRange?: boolean;
  hasnavi?: boolean;
  mapListings?: MapListing;
  setIsListingOn?: (listingOn: boolean) => void;
  setSearchListings?: (listing: any[]) => void;
}

const Map: React.FC<MapProps> = ({
  mapStyleCommon,
  initCoordinate,
  showRange,
  mapListings,
  hasnavi,
  setSearchListings,
  rentmain,
  setIsListingOn,
}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<mapboxgl.Popup[]>([]);

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

    if (showRange && map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        pitchWithRotate: false,
        center: initCoordinate,
        zoom: 12,
      });

      // Add marker
      const customMarker = document.createElement('div');
      customMarker.style.width = '200px';
      customMarker.style.height = '200px';
      customMarker.style.borderRadius = '50%';
      customMarker.style.background = 'rgb(236, 102, 42, 0.7)';

      new Marker(customMarker).setLngLat(initCoordinate).addTo(map.current);

      map.current.flyTo({
        center: initCoordinate,
        essential: true,
        zoom: 13,
      });

      // Update the size of the custom marker based on the zoom level
      const updateMarkerSize = () => {
        const zoom = map.current.getZoom();
        const size = 140 * (1 / Math.pow(2, 13.5 - zoom));
        customMarker.style.width = `${size}px`;
        customMarker.style.height = `${size}px`;
      };

      // Set initial marker size
      updateMarkerSize();

      // Add zoom event listener to update marker size on zoom
      map.current.on('zoom', updateMarkerSize);
    }

    if (rentmain) {
      const getBuildingData = async (buildingId: string) => {
        try {
          const response = await axios.post(`/api/rentlisting`, {
            buildingId,
          });
          // console.log(response.data.recentListings);
          setSearchListings?.(response.data.recentListings);
        } catch (error) {
        } finally {
        }
      };

      if (mapListings) {
        // Remove all the markers and popups
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        popupsRef.current.forEach((popup) => popup.remove());
        popupsRef.current = [];

        Object.values(mapListings).forEach((building) => {
          // CREATE A MARKER
          const customMarker = new Image();
          customMarker.src = '/assets/icon/bicon_32.png';
          customMarker.style.width = `20px`;
          customMarker.style.height = `20px`;
          customMarker.style.cursor = `pointer`;
          // console.log(building);
          const marker = new mapboxgl.Marker(customMarker)
            .setLngLat(building.coordinate)
            .addTo(map.current);
          markersRef.current.push(marker);

          // CREATE A POPUP
          const alwaysVisiblePopup = new Popup({
            className: 'custom-popup',
            offset: [0, 0],
            closeButton: false,
            closeOnClick: false,
          }).setHTML(
            `${
              building.price.length != 1
                ? `<span>$${Math.round(
                    Math.min(...building.price) / 1000
                  )}k~</span><span>$${Math.round(
                    Math.max(...building.price) / 1000
                  )}k</span>`
                : `<span>$${Math.round(building.price[0] / 1000)}k</span>`
            }`
          );
          alwaysVisiblePopup.setLngLat(building.coordinate).addTo(map.current);
          popupsRef.current.push(alwaysVisiblePopup);

          // CREATE A CLICK TO VIEW BUILDING LISTING
          const getBuilding = async () => {
            map.current.flyTo({
              center: building.coordinate,
              essential: true,
              zoom: 15,
            });
            getBuildingData?.(building.buildingId);
            setTimeout(() => {
              setIsListingOn!(true);
            }, 1000);
          };
          marker.getElement().addEventListener('click', getBuilding);
          alwaysVisiblePopup
            .getElement()
            .addEventListener('click', getBuilding);
        });
      }
    }
  }, [
    initCoordinate,
    mapListings,
    rentmain,
    setIsListingOn,
    setSearchListings,
    showRange,
  ]);

  return (
    <div className={`relative w-full z-0 ${mapStyleCommon}`}>
      <div className='map-container' ref={mapContainer} />
    </div>
  );
};
export default Map;
