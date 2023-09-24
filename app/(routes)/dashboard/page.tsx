import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from './components/overview'

const Dashboard = () => {
  return (
    <div className="space-y-8 px-6 pt-2">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to the dashboard</p>
      </div>
      <div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
