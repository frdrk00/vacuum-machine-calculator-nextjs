import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const profile = await currentProfile()
    const body = await req.json()
    const { title, description, imageUrl } = body

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    if (!description) {
      return new NextResponse('Description is required', { status: 400 })
    }

    const createMaterial = await db.material.create({
      data: {
        title,
        description,
        imageUrl,
        profileId: profile.id,
      },
    })

    return NextResponse.json(createMaterial)
  } catch (error) {
    console.log('[MATERIAL_POST:', error)
    return new NextResponse('Internal Error_MATERIALS', { status: 500 })
  }
}
