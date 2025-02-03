import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppThemeProvider } from '@/components/theme/AppThemeProvider'
import { NowPlayingStoreProvider } from '@/globalState/NowPlayingStoreProvider'
import { RootStack } from '@/components/navigation/RootStack'
import { useFonts } from 'expo-font'

export default function RootLayout () {
  const queryClient = new QueryClient()
  useFonts({
    Almarai: require('../assets/fonts/Almarai-Regular.ttf'),
    KFGQPC: require('../assets/fonts/KFGQPC-Uthmanic-Script-HAFS-Regular.otf'),
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <NowPlayingStoreProvider>
          <RootStack/>
        </NowPlayingStoreProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  )
}
