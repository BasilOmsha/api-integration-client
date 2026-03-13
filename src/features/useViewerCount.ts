import { useEffect, useState } from 'react'

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

import { BASE_URL } from '../api/index.ts'

const HUB_URL = `${BASE_URL}/hubs/dashboard`

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