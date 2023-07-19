import { ObjectId } from 'mongodb';

export const RENT_TYPE = [
  {
    rentCategory: '단기 렌트',
    rentDescription: '일/주 단위',
    icon: 'MdCardTravel',
  },
  {
    rentCategory: '중기 렌트',
    rentDescription: '월 단위',
    icon: 'BsHouses',
  },
  {
    rentCategory: '장기 렌트',
    rentDescription: '연 단위',
    icon: 'BsBuildings',
  },
];

export const ROOM_TYPE = {
  bedroom: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom'],
  bathroom: ['Share', '1 Bathroom', '2 Bathroom', '3+ Bathroom'],
  bfee: ['중개비 있음', '중개비 없음'],
  utility: ['유틸리티 포함', '유틸리티 별도'],
};

export interface IAmenity {
  label: string;
  value: string;
  icon: string;
}

export interface IBuildingToSubwayInfo {
  _id: ObjectId;
  buildingId: ObjectId;
  name: string;
  distance: number;
  lines: string[];
}

export const AMENITY = [
  { label: '24h门卫', value: 'Doorman', icon: 'MdSecurity' },
  { label: '健身房', value: 'Gym', icon: 'CgGym' },
  { label: '电梯', value: 'Elevator', icon: 'TbElevator' },
  { label: '大厅', value: 'Lobby', icon: 'TbSofa' },
  { label: '停车场', value: 'Garage', icon: 'MdOutlineGarage' },
  { label: '外屋顶', value: 'Roof', icon: 'TbLiveView' },
  { label: '洗衣室', value: 'WashRoom', icon: 'MdOutlineLocalLaundryService' },
  {
    label: '室内篮球场',
    value: 'IndoorBasket',
    icon: 'MdOutlineSportsBasketball',
  },
  { label: '室内高尔夫', value: 'IndoorGolf', icon: 'MdOutlineSportsGolf' },
  { label: '公用厨房', value: 'CommonKitchen', icon: 'MdOutlineSoupKitchen' },
  { label: '游泳池', value: 'Pool', icon: 'MdOutlinePool' },
  { label: '瑜伽室', value: 'YogaRoom', icon: 'MdOutlineSportsGymnastics' },
  { label: 'WiFi', value: 'Wifi', icon: 'MdOutlineWifi' },
  { label: 'BBQ', value: 'BBQ', icon: 'MdOutlineOutdoorGrill' },
];

export const FEATURE = [
  { label: '微波炉', value: 'Microwave', icon: 'MdMicrowave' },
  { label: '空调', value: 'AC', icon: 'TbAirConditioning' },
  { label: '洗衣机', value: 'Washer', icon: 'TbWashMachine' },
  { label: '烘干机', value: 'Dryer', icon: 'MdOutlineLocalLaundryService' },
  { label: '洗碗机', value: 'Dishwasher', icon: 'TbWashMachine' },
  { label: '浴缸', value: 'Bathtube', icon: 'MdOutlineBathtub' },
  { label: '阳台', value: 'Balcony', icon: 'MdOutlineBalcony' },
];

interface Building {
  buildingId: string;
  coordinate: [number, number];
  price: number[];
}

export interface MapListing {
  [key: string]: Building;
}

export const SEARCH_OPTIONS = {
  bed: [
    { label: 'Studio', value: 'Studio' },
    { label: '1 Bedroom', value: '1 Bedroom' },
    { label: '2 Bedroom', value: '2 Bedroom' },
    { label: '3 Bedroom', value: '3 Bedroom' },
  ],
  bath: [
    { label: '1 Bathroom', value: '1 Bathroom' },
    { label: '2 Bathroom', value: '2 Bathroom' },
  ],
  subway: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: 'A', value: 'A' },
    { label: 'C', value: 'C' },
    { label: 'E', value: 'E' },
    { label: 'B', value: 'B' },
    { label: 'D', value: 'D' },
    { label: 'F', value: 'F' },
    { label: 'M', value: 'M' },
    { label: 'G', value: 'G' },
    { label: 'L', value: 'L' },
    { label: 'J', value: 'J' },
    { label: 'Z', value: 'Z' },
    { label: 'N', value: 'N' },
    { label: 'Q', value: 'Q' },
    { label: 'R', value: 'R' },
    { label: 'W', value: 'W' },
  ],
  category: [
    { label: '短期出租', value: '단기 렌트' },
    { label: '中期出租', value: '중기 렌트' },
    { label: '长期出租', value: '장기 렌트' },
  ],
  review: [
    { label: '1分以上', value: '1' },
    { label: '2分以上', value: '2' },
    { label: '3分以上', value: '3' },
    { label: '4分以上', value: '4' },
  ],
  broker: [
    { label: '有中介费', value: '중개비 있음' },
    { label: '无中介费', value: '중개비 없음' },
  ],
  utility: [
    { label: '无包括水电气', value: '유틸리티 별도' },
    { label: '包括水电气', value: '유틸리티 포함' },
  ],
};
