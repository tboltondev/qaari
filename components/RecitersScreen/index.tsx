import React from 'react'
import { StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Menu } from '@/components/Menu'
import { LoadingMenuItem } from '@/components/LoadingMenuItem'
import { ReciterMenuItem } from '@/components/RecitersScreen/ReciterMenuItem'
import QuranDotCom from '@/services/quranDotCom'
import { Reciter } from '@/domain/Reciter'

export const RecitersScreen = () => {
  const reciters = useQuery<Reciter[]>({
    queryKey: ['reciters'],
    queryFn: QuranDotCom.getReciters
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
          keyExtractor={(item) => `${item.name}_${item.style}`}
        />}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})
