import React from 'react'
import { StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { Surah, Suwar } from '@/constants/Suwar'
import { Menu } from '@/components/Menu/Menu'
import { SurahMenuItem } from '@/components/ReciterScreen/SurahMenuItem'
import { NowPlayingStore } from '@/globalState/store'
import { SearchBar } from '@/components/SearchBar'
import { ThemedPicker, ThemedPickerItem } from '@/components/theme/ThemedPicker'
import { Picker } from '@/components/Picker'

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
      return props.nowPlaying?.selectedRiwayah?.surahList.includes(surah.number)
    }

    function onRiwayahChange (value: string) {
      const selectedRiwayah = props.nowPlaying?.availableRiwayat?.find(r => (
        r.riwayah.id === parseInt(value)
      ))

      if (selectedRiwayah) {
        props.nowPlaying?.selectRiwayah(selectedRiwayah)
      }
    }

    return (
      <ThemedView style={styles.container}>
        <SearchBar value={searchTerm} onChangeText={setSearchTerm}/>

        <Picker
          value={props.nowPlaying?.selectedRiwayah?.riwayah.name || ""}
          data={props.nowPlaying?.availableRiwayat?.map(r => r.riwayah.id.toString()) || []}
          onChange={() => {}}
        />

        <Menu
          data={Suwar.filter((surah) => filterAvailable(surah) && filterBySearch(surah))}
          renderItem={({ item }) =>
            <SurahMenuItem
              surahNumber={item.number}
              reciterId={props.reciterId}
              riwayahId={props.nowPlaying?.selectedRiwayah?.riwayah.id}
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
