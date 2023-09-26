import SelectorPage from "./selector/selector-page"

const MachineCalculatorPage = () => {
  return (
    <div className="space-y-8 px-6 pt-2">
      <div>
        <h1 className="text-3xl font-bold">Machine Calculator</h1>
        <p className="text-gray-500">Calculate the machine settings</p>
      </div>
      <div className="flex max-sm:justify-center max-sm:space-y-4 justify-between items-center max-sm:flex-col">
        <SelectorPage />
      </div>
    </div>
  )
}

export default MachineCalculatorPage
