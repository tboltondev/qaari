import React from 'react'
import { StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { Surah, Suwar } from '@/constants/Suwar'
import { Menu } from '@/components/Menu/Menu'
import { SurahMenuItem } from '@/components/ReciterScreen/SurahMenuItem'
import { NowPlayingStore } from '@/globalState/store'
import { SearchBar } from '@/components/SearchBar'

export const ReciterScreen = inject('nowPlaying')(observer(
  (props: { reciterId: number, nowPlaying?: NowPlayingStore }) => {
    const [searchTerm, setSearchTerm] = React.useState('')

    function filterBySearch (surah: Surah) {
      const matchesName = surah.name.toLocaleLowerCase().includes(
        searchTerm.toLocaleLowerCase().trim()
      )

      const matchesNumber = surah.number.toString().includes(searchTerm)

      return matchesName || matchesNumber
    }

    function filterAvailable (surah: Surah) {
      return props.nowPlaying?.reciterPage?.mushaf[0].surahList.includes(surah.number)
    }

    return (
      <ThemedView style={styles.container}>
        <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
        <Menu
          data={Suwar.filter((surah) => filterAvailable(surah) && filterBySearch(surah))}
          renderItem={({ item }) =>
            <SurahMenuItem
              surahNumber={item.number}
              reciterId={props.reciterId}
              name={item.name}
            />
          }
          keyboardShouldPersistTaps="handled"
        />
      </ThemedView>
    )
  }
))

const styles = StyleSheet.create({
  container: { flex: 1 },
})