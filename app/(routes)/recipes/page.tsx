import SelectorPage from './selector/selector-page'

const RecipesPage = () => {
  return (
    <div className="space-y-8 px-6 pt-2">
      <div>
        <h1 className="text-3xl font-bold">Recipes</h1>
        <p className="text-gray-500">Create and manage recipes</p>
      </div>
      <div className="flex max-sm:justify-center max-sm:space-y-4 justify-between items-center max-sm:flex-col">
        <SelectorPage />
      </div>
    </div>
  )
}

export default RecipesPage
