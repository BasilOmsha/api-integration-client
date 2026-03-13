import { useEffect, useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/.*$/, '')
  ?? 'http://localhost:5143'

const HUB_URL = `${BASE}/hubs/dashboard`

export function useViewerCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build()

    connection.on('ViewerCount', (viewerCount: number) => {
      setCount(viewerCount)
    })

    connection.start().catch((err) => {
      console.error('SignalR connection failed:', err)
    })

    return () => {
      connection.stop()
    }
  }, [])

  return count
}