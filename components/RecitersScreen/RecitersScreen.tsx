import React from 'react'
import { StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { Menu } from '@/components/Menu/Menu'
import { LoadingMenuItem } from '@/components/Menu/LoadingMenuItem'
import { ReciterMenuItem } from '@/components/RecitersScreen/ReciterMenuItem'
import { Reciter } from '@/domain/Reciter'
import { NowPlayingStore } from '@/globalState/store'
import { SearchBar } from '@/components/SearchBar'
import { ThemedText } from '@/components/theme/ThemedText'

export const RecitersScreen = inject('nowPlaying')(observer(
  (props: { nowPlaying?: NowPlayingStore }) => {
    const [searchTerm, setSearchTerm] = React.useState('')

    function filterBySearch (reciter: Reciter) {
      return reciter.name.toLocaleLowerCase().includes(
        searchTerm.toLocaleLowerCase().trim()
      )
    }

    return (
      <ThemedView style={styles.container}>
        <SearchBar value={searchTerm} onChangeText={setSearchTerm}/>
        {props.nowPlaying!.reciters.error && (
          <ThemedText style={styles.errorText}>There was a problem loading the reciters, please try again.</ThemedText>
        )}
        {props.nowPlaying!.reciters.data.size === 0 && !props.nowPlaying!.reciters.error
          ? <Menu
            data={[300, 280, 320, 240, 270, 300, 280, 320, 240, 270, 280, 320]}
            renderItem={({ item }) => <LoadingMenuItem width={item}/>}
          />
          : <Menu
            data={[...props.nowPlaying!.reciters.data].filter(filterBySearch)}
            renderItem={({ item }) => <ReciterMenuItem reciter={item}/>}
            keyExtractor={(item) => `${item.name}_${item.style}`}
            keyboardShouldPersistTaps="handled"
          />}
      </ThemedView>
    )
  }
))

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  errorText: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  }
})
