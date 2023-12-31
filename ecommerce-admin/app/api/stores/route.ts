import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

// POST

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (err: any) {
    console.log('[STORE_POST]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
