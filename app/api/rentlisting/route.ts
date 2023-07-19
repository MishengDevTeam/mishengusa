import { NextResponse } from 'next/server';
import mgClientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const body = await request.json();
  const { start, rentId } = body;
  const client = await mgClientPromise;
  const rentCollection = client.db('misaeng').collection('RentListing');
  const buildingCollection = client.db('misaeng').collection('Building');
  const buildingToSubwayCollection = client
    .db('misaeng')
    .collection('BuildingToSubway');
  const reviewCollection = client.db('misaeng').collection('Review');

  if (start) {
    const startNumber = parseInt(start);

    // console.log(start);

    const recentListings = await rentCollection
      .aggregate([
        {
          $project: {
            _id: 1,
            category: 1,
            buildingId: 1,
            bedCount: 1,
            bathCount: 1,
            price: 1,
            imageSrc: 1,
            moveDate: 1,
          },
        },
        { $sort: { createdAt: -1, _id: 1 } },
        { $skip: startNumber },
        { $limit: 20 },
      ])
      .toArray();

    return NextResponse.json({ recentListings });
  }

  if (rentId) {
    const listingInfo = await rentCollection
      .find(
        { _id: new ObjectId(rentId) },
        {
          projection: {
            _id: 1,
            amenity: 1,
            bathCount: 1,
            bedCount: 1,
            broker: 1,
            buildingId: 1,
            category: 1,
            contact: 1,
            createdAt: 1,
            description: 1,
            feature: 1,
            imageSrc: 1,
            length: 1,
            moveDate: 1,
            price: 1,
            title: 1,
            userId: 1,
            utility: 1,
          },
        }
      )
      .toArray();
    const buildingInfo = await buildingCollection
      .find(
        {
          _id: listingInfo[0].buildingId,
        },
        {
          projection: {
            _id: 1,
            coordinate: 1,
          },
        }
      )
      .toArray();
    const buildingToSubwayInfo = await buildingToSubwayCollection
      .find({
        buildingId: new ObjectId(listingInfo[0].buildingId),
      })
      .toArray();
    const reviewInfo = await reviewCollection
      .find({
        buildingId: new ObjectId(listingInfo[0].buildingId),
      })
      .limit(10)
      .toArray();
    return NextResponse.json({
      listingInfo,
      buildingInfo,
      buildingToSubwayInfo,
      reviewInfo,
    });
  }
}
