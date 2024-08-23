import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppThemeProvider } from '@/theme/AppThemeProvider'
import { StoreProvider } from '@/globalState/StoreProvider'
import { RootStack } from '@/components/RootStack'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'

export default function RootLayout () {
  const queryClient = new QueryClient()
  const [loaded] = useFonts({
    Almarai: require('../assets/fonts/Almarai-Regular.ttf'),
  })

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

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
