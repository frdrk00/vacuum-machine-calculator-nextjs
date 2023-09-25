import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const profile = await currentProfile()
    const body = await req.json()
    const { title, type, quantity, categoryIds } = body

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    if (!type) {
      return new NextResponse('Type is required', { status: 400 })
    }

    if (!quantity) {
      return new NextResponse('Quantity is required', { status: 400 })
    }

    const createMaterial = await db.material.create({
      data: {
        title,
        type,
        quantity,
      },
    })

    return NextResponse.json(createMaterial)
  } catch (error) {
    console.log('[MATERIAL_POST:', error)
    return new NextResponse('Internal Error_MATERIALS', { status: 500 })
  }
}

export async function GET() {
  try {
    const materials = await db.material.findMany()

    return NextResponse.json(materials)
  } catch (error) {
    console.log('[MATERIAL_GET:', error)
    return new NextResponse('Internal Error_MATERIALS', { status: 500 })
  }
}
