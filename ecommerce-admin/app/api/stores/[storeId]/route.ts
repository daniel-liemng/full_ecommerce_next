import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// PATCH & DELETE

export const PATCH = async (
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store ID is required!', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log('[STORE_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!storeId) {
      return new NextResponse('Store id is required!', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log('[STORE_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
