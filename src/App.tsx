import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'sonner'
import { QueryCache } from '@tanstack/react-query'

import { ApiError } from './utils/errors.ts'

import { ActiveThemeProvider } from './components/active-theme.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import DashboardLayout from './pages/dashboard/layout.tsx'
import Dashboard from './pages/dashboard'
import { Toaster } from './components/ui/sonner.tsx'
import Home from './pages/home.tsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 2,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false
        }
    },
    queryCache: new QueryCache({
        onError: (error) => {
            if (error instanceof ApiError) {
                toast.error(error.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    })
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="ui-theme">
                <ActiveThemeProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <DashboardLayout>
                                        <Dashboard />
                                    </DashboardLayout>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                        <Toaster />
                    </BrowserRouter>
                </ActiveThemeProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
