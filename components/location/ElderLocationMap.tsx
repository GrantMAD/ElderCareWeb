'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { MapPin, Navigation, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { LocationSharing } from '@/types/app'

// Note: If you actually install @vis.gl/react-google-maps, uncomment these and swap the mock map div.
// import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps'

interface ElderLocationMapProps {
  locationData?: LocationSharing | null
  loading?: boolean
}

export function ElderLocationMap({ locationData, loading }: ElderLocationMapProps) {
  const [mapZoom, setMapZoom] = useState(15)

  if (loading) {
    return (
      <Card className="h-[500px] flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </Card>
    )
  }

  if (!locationData || !locationData.is_enabled) {
    return (
      <Card className="h-[500px] flex flex-col items-center justify-center p-6 text-center border-dashed bg-surface-50 dark:bg-surface-900/50">
        <div className="w-16 h-16 bg-surface-200 dark:bg-surface-800 rounded-full flex items-center justify-center mb-4">
          <Navigation className="w-8 h-8 text-surface-400" />
        </div>
        <h3 className="text-xl font-medium text-surface-900 dark:text-surface-100">Location Sharing Disabled</h3>
        <p className="text-surface-500 mt-2 max-w-sm">
          Location sharing is currently turned off on the elder's device. They need to enable it in their settings.
        </p>
      </Card>
    )
  }

  if (!locationData.last_lat || !locationData.last_lng) {
    return (
      <Card className="h-[500px] flex flex-col items-center justify-center p-6 text-center border-dashed bg-surface-50 dark:bg-surface-900/50">
        <MapPin className="w-12 h-12 text-surface-300 dark:text-surface-600 mb-4" />
        <h3 className="text-xl font-medium text-surface-900 dark:text-surface-100">Waiting for Location</h3>
        <p className="text-surface-500 mt-2">
          Location sharing is enabled, but we haven't received a signal yet.
        </p>
      </Card>
    )
  }

  const position = { lat: locationData.last_lat, lng: locationData.last_lng }
  
  // This is a placeholder for the actual Google Maps implementation
  // To use real maps, uncomment the APIProvider and Map components and provide an API key.
  return (
    <div className="relative">
      <Card className="overflow-hidden h-[500px] relative border-surface-200 dark:border-surface-800">
        {/* Map Placeholder Wrapper */}
        <div className="absolute inset-0 bg-surface-100 dark:bg-surface-900">
          {/* 
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <Map 
              defaultCenter={position} 
              defaultZoom={mapZoom} 
              mapId="elder-map-id"
              disableDefaultUI={true}
            >
              <AdvancedMarker position={position}>
                <Pin background={'#ef4444'} borderColor={'#7f1d1d'} glyphColor={'#fff'} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
          */}
          <div className="w-full h-full flex flex-col items-center justify-center text-surface-400">
            <MapPin className="w-12 h-12 mb-2 text-red-500" />
            <p>Google Maps Area</p>
            <p className="text-xs">Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}</p>
          </div>
        </div>

        {/* Floating Info Card overlay */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto sm:w-80 bg-white/90 dark:bg-surface-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-surface-100 leading-tight">Current Location</h4>
              <p className="text-xs text-surface-500 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                Updated {locationData.last_updated ? formatDistanceToNow(new Date(locationData.last_updated), { addSuffix: true }) : 'just now'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
