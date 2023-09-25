import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { materials, title } = body
    console.log(body)

    const createdRecipe = await db.recipe.create({
      data: {
        title,
        materials: {
          create: [
            {
              recipeMaterials: {
                create: {
                  material: materials,
                  recipe: title,
                },
              },
            },
          ],
        },
      },
    })

    return NextResponse.json(createdRecipe)
  } catch (error) {
    console.log('[RECIPE_POST:', error)
    return new NextResponse('Internal Error_RECIPES', { status: 500 })
  }
}
