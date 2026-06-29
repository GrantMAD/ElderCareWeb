'use client'
import { ElderLocationMap } from '@/components/location/ElderLocationMap'
import { useElderLocation } from '@/hooks/useElderLocation'

export default function LocationPage() {
  const { location, loading } = useElderLocation()

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Location</h2>
        <p className="mt-1 text-sm text-surface-500">
          Monitor the elder's current location when away from home.
        </p>
      </div>

      <div className="flex-1 min-h-[500px]">
        <ElderLocationMap locationData={location} loading={loading} />
      </div>
    </div>
  )
}
