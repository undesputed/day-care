import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ChatLoading() {
  return (
    <div className="container mx-auto py-8 px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* AI Message */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 max-w-[80%]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="space-y-2 max-w-[80%]">
              <Skeleton className="h-4 w-24 ml-auto" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          </div>

          {/* AI Message */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 max-w-[80%]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1 rounded-lg" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </Card>
    </div>
  )
}
