'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface RecipeMaterial {
  id: number
  title: string
  weight: number
}

interface Recipe {
  id: number
  title: string
  recipeMaterials: RecipeMaterial[]
}

const SelectorPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/recipes')
      setRecipes(res.data) // Assuming the response contains an array of recipes
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Selector Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Recipes</h2>
          <ul className='flex w-full space-x-2 space-y-2'>
            {recipes.map((recipe) => (
              <li key={recipe.id} className='border border-dotted p-2'>
                <h3 className='text-red-400'>{recipe.title}</h3>
                <h4 className='font-semibold'>Materials:</h4>
                <ul>
                  {recipe.recipeMaterials.map((material) => (
                    <li key={material.id}>
                      {material.title} - {material.weight}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SelectorPage
