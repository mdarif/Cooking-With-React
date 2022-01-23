import React, { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import { v4 as uuidv4 } from 'uuid'
import '../css/app.css'
import RecipeEdit from './RecipeEdit'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App () {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    //get the localStorage first
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) {
      setRecipes(JSON.parse(recipeJSON)) //Parse string then recipes state as the obj
    }
  }, [])

  useEffect(() => {
    //set the localStorage after
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes)) //save the object as string
    return () => {
      console.log('recipes set') // To do the clean-up
    }
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect (id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd () {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [{ id: uuidv4(), name: '', amount: '' }]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange (id, recipe) {
    const newRecipes = [...recipes] //copying current recipe array
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete (id) {
    if (selectedRecipe !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
        recipes={recipes}
        // handleRecipeAdd={handleRecipeAdd}
        // handleRecipeDelete={handleRecipeDelete}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
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
