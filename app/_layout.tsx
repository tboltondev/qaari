import React from 'react'
import { useFonts } from 'expo-font'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppThemeProvider } from '@/theme'
import { RootStack } from '@/components/navigation/RootStack'
import { AudioPlayerProvider, PlayerWidget } from '@/components/player'

export default function RootLayout () {
  const queryClient = new QueryClient()

  // TODO: move font loading to app.json (will include fonts in build instead of loading at runtime like this)
  useFonts({
    Almarai: require('../assets/fonts/Almarai-Regular.ttf'),
    // TODO: this font is not displaying sukoon on alif e.g. 30:8 - could be encoding issue also
    Uthmani: require('../assets/fonts/Uthmani.ttf')
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AudioPlayerProvider>
          <RootStack />
          <PlayerWidget />
        </AudioPlayerProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  )
}
