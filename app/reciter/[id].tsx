import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import { FlatList } from 'react-native'
import { NowPlayingStore } from '@/globalState/store'
import { Suwar } from '@/constants/Suwar'
import { inject, observer } from 'mobx-react'
import { MenuItem } from '@/components/MenuItem'

type SurahItemProps = {
  surahNumber: number
  reciterId: number
  name: string
  nowPlaying?: NowPlayingStore // made nullable so component is not expecting prop, if injected it will not be null
}

const SurahItem = inject('nowPlaying')(observer((props: SurahItemProps) => {
  async function handlePress () {
    const isDiffReciter = props.nowPlaying?.reciterId !== props.reciterId
    const isDiffSurah = props.nowPlaying?.surahNumber !== props.surahNumber

    if (isDiffReciter || isDiffSurah) {
      await props.nowPlaying?.load(props.reciterId, props.surahNumber)
    }
  }

  return (
    <MenuItem
      title={`${props.surahNumber}. ${props.name}`}
      href="/player"
      onPress={handlePress}
    />
  )
}))

export default function ReciterPage () {
  const { id } = useLocalSearchParams()

  return (
    <ThemedView>
      <FlatList
        data={Suwar}
        renderItem={({ item, index }) =>
          <SurahItem
            surahNumber={index + 1}
            reciterId={parseInt(id as string)}
            name={item.name}
          />
        }
      />
    </ThemedView>
  )
}
