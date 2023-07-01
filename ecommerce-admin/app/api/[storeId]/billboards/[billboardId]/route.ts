import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// GET One & PATCH & DELETE

// Get a single billboard
export const GET = async (
  req: Request,
  { params }: { params: { billboardId: string } }
) => {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required!', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.log('[BILLBOARD_GET', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required!', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required!', { status: 400 });
    }

    // check storeId exists in current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.log('[BILLBOARD_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated!', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required!', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard ID is required!', { status: 400 });
    }

    // check storeId exists in current user
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.log('[BILLBOARD_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
