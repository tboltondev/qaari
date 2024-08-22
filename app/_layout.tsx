import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppThemeProvider } from '@/theme/AppThemeProvider'
import { StoreProvider } from '@/globalState/StoreProvider'
import { RootStack } from '@/components/RootStack'

export default function RootLayout () {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <StoreProvider>
          <RootStack/>
        </StoreProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  )
}
