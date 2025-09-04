import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

type StatProp = {
    title: string,
    amount: number,
    percent: number
}
export default function StatCard({title,amount,percent}:StatProp) {
  return (
    <Card className="bg-none shadow-none border-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <span className="text-sm font-medium text-green-600">+{percent}%</span>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{amount}</div>
      </CardContent>
    </Card>
  )
}
