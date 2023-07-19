import { useEffect, useState } from 'react';
import Map from '../Map';

interface MapSectionProps {
  isListingOn: boolean;
}

const MapSection: React.FC<MapSectionProps> = ({ isListingOn }) => {
  const mapStyleCommon = `h-[42vh] sm:h-[87vh]`;

  return (
    <div
      className={`w-full sm:w-[50%] ${
        isListingOn ? 'hidden' : 'block'
      } ${mapStyleCommon}`}
    >
      <Map
        initCoordinate={[-74.0085514, 40.7127503]}
        mapStyleCommon={mapStyleCommon}
      />
    </div>
  );
};
export default MapSection;
