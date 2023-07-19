import RentIndiAmenity from './RentIndiAmenity';
import RentIndiBasic from './RentIndiBasic';
import RentIndiDescription from './RentIndiDescription';
import RentIndiDetail from './RentIndiDetail';
import { AMENITY, FEATURE } from '@/types/RentTypes';
import RentIndiMap from './RentIndiMap';
import RentIndiSubway from './RentIndiSubway';
import RentIndiReview from './RentIndiReview';

interface RentIndiInfoProps {
  currentListing: any;
  buildingInfo: any;
  buildingToSubwayInfo: any;
  reviewInfo: any;
}

const RentIndiInfo: React.FC<RentIndiInfoProps> = ({
  currentListing,
  buildingInfo,
  buildingToSubwayInfo,
  reviewInfo,
}) => {
  return (
    <div className='w-full flex flex-col gap-4 py-4'>
      <hr />
      <RentIndiBasic
        bed={currentListing.bedCount}
        bath={currentListing.bathCount}
        movedate={currentListing.moveDate}
        price={currentListing.price}
      />
      <hr />
      <div className='flex flex-col gap-6 px-4'>
        <RentIndiDescription
          title='房源简介'
          description={currentListing.description}
        />
        <RentIndiAmenity
          title='公寓设施'
          items={currentListing.amenity}
          type={AMENITY}
        />
        <RentIndiAmenity
          title='房间设施'
          items={currentListing.feature}
          type={FEATURE}
        />
        <RentIndiDetail
          title='其他'
          category={currentListing.category}
          broker={currentListing.broker}
          utility={currentListing.utility}
        />
        <RentIndiMap title='位置' coordinate={buildingInfo.coordinate} />
        <RentIndiSubway title='周边地铁' subway={buildingToSubwayInfo} />
        <RentIndiReview
          title='最新点评'
          subtitle='按顺序，从最近的评论开始，最多显示10条'
          reviewInfo={reviewInfo}
        />
      </div>
    </div>
  );
};
export default RentIndiInfo;
