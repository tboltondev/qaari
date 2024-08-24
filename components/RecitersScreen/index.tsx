import React from 'react'
import { StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { NowPlayingStore } from '@/globalState/store'
import { Menu } from '@/components/Menu'
import { LoadingMenuItem } from '@/components/LoadingMenuItem'
import { ReciterMenuItem } from '@/components/RecitersScreen/ReciterMenuItem'

type Reciter = {
  id: number
  reciter_name: string
  style: string
  translated_name: {
    name: string
    language_name: string
  }

  nowPlaying: NowPlayingStore
}

export const RecitersScreen = () => {
  const getReciters = async () => {
    const response = await fetch('https://api.quran.com/api/v4/resources/recitations') // TODO: move somewhere else, add localisation
    const json = await response.json()
    return json.recitations
  }

  const reciters = useQuery<Reciter[]>({
    queryKey: ['reciters'],
    queryFn: getReciters
  })

  return (
    <ThemedView style={styles.container}>
      {/*TODO: style errors*/}
      {reciters.error && <ThemedText>There was a problem loading the reciters, please try again.</ThemedText>}
      {reciters.isLoading
        ? <Menu
          data={[300, 280, 320, 240, 270, 300, 280, 320, 240, 270, 280, 320]}
          renderItem={({ item }) => <LoadingMenuItem width={item}/>}
        />
        : <Menu
          data={reciters.data}
          renderItem={({ item }) => <ReciterMenuItem {...item} />}
          keyExtractor={(item) => `${item.reciter_name}_${item.style}`}
        />}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})
