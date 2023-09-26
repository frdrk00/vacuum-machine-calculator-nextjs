import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const createdRecipe = await db.recipe.create({
      data: {
        title: body.title,
        recipeMaterials: {
          createMany: {
            data: body.materials.map((material: any) => ({
              title: material.title,
              materialId: material.materialId,
              weight: material.weight,
            })),
          },
        },
      },
    })

    return NextResponse.json(createdRecipe)
  } catch (error) {
    console.log('[RECIPE_POST:', error)
    return new NextResponse('Internal Error_RECIPES', { status: 500 })
  }
}

export async function GET() {
  try {
    const recipes = await db.recipe.findMany({
      include: {
        recipeMaterials: {
          include: {
            recipe: true
          },
        },
      },
    })

    return NextResponse.json(recipes)
  } catch (error) {
    console.log('[RECIPE_GET:', error)
    return new NextResponse('Internal Error_RECIPES', { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const updatedRecipe = await db.recipe.update({
      where: { id: body.id },
      data: {
        title: body.title,
        recipeMaterials: {
          deleteMany: {},
          createMany: {
            data: body.materials.map((material: any) => ({
              title: material.title,
              materialId: material.materialId,
              weight: material.weight,
            })),
          },
        },
      },
    })

    return NextResponse.json(updatedRecipe)
  } catch (error) {
    console.log('[RECIPE_PUT:', error)
    return new NextResponse('Internal Error_RECIPES', { status: 500 })
  }
}
