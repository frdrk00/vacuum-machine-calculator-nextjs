import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body)

    const createdRecipe = await db.recipe.create({
      data: {
        title: body.title, // Nahradit 'recipeTitle' podle vaší datové struktury
        materials: {
          createMany: {
            data: body.materials.map((material) => ({
              title: material.materialId,
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
