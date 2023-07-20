import mgClientPromise from '@/app/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await mgClientPromise;
    const CNBlogCollection = client.db('misaeng').collection('CNBlogListing');

    console.log(body);

    let blogListing;

    const result = await CNBlogCollection.insertOne(body);

    if (result.insertedId) {
      blogListing = await CNBlogCollection.findOne({ _id: result.insertedId });
    } else {
      console.log('Insertion failed');
      return NextResponse.json({ error: 'Insertion failed' });
    }

    return NextResponse.json({ blogListing });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: (error as Error).message });
  }
}
