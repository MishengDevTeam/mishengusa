'use client';

import Map from '../../Map';

interface RentIndiMapProps {
  title: string;
  coordinate: [number, number];
}

const RentIndiMap: React.FC<RentIndiMapProps> = ({ title, coordinate }) => {
  const mapStyleCommon = `h-[240px] border-2 border-[#EC662A]`;

  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <Map
        initCoordinate={coordinate}
        mapStyleCommon={mapStyleCommon}
        showRange
      />
    </div>
  );
};
export default RentIndiMap;
