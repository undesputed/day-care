import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LoadingCardProps {
  title?: boolean
  description?: boolean
  rows?: number
  columns?: number
  height?: string
  className?: string
}

export function LoadingCard({
  title = true,
  description = false,
  rows = 3,
  columns = 2,
  height,
  className = "",
}: LoadingCardProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader className="space-y-2">
          {title && <Skeleton className="h-6 w-48" />}
          {description && <Skeleton className="h-4 w-64" />}
        </CardHeader>
      )}
      <CardContent>
        {height ? (
          <Skeleton className={`w-full ${height}`} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: rows * columns }).map((_, i) => (
              <div key={i} className={`${columns > 1 ? `col-span-1` : `col-span-full`} space-y-2`}>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function LoadingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function LoadingTable({ columns = 4, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <div className={`min-w-[600px]`}>
        <div className={`grid grid-cols-${columns} gap-4 py-3 border-b`}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`grid grid-cols-${columns} gap-4 py-4 border-b`}>
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-5 w-32" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LoadingList({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </div>
  )
}

export function LoadingGrid({ items = 6 }: { items?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: items }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-6">
            <div className="mb-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-28" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function LoadingHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

export default function PageLoading() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <LoadingHeader />
      <LoadingStats />
      <LoadingCard title rows={2} columns={1} />
      <LoadingGrid items={3} />
    </div>
  )
}
