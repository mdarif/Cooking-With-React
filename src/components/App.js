import React, { useState } from 'react'
import RecipeList from './RecipeList'
import uuidv4 from 'uuid/v4'
import '../css/app.css'

function App () {
  const [recipes, setRecipes] = useState(sampleRecipes)

  return <RecipeList recipes={recipes} />
}

function handleRecipeAdd () {
  const newRecipe = {
    id: uuidv4()
  }
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions:
      '1. Put slat on Chicken \n2. Put chicken in oven \n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Beaf',
    servings: 5,
    cookTime: '0:45',
    instructions: '1. Put slat on Beaf \n2. Put beaf in oven \n3. Eat beaf',
    ingredients: [
      {
        id: 1,
        name: 'Beaf',
        amount: '20 Pounds'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '10 Tbs'
      }
    ]
  }
]

export default App
