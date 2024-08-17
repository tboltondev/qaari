import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import { NowPlayingStore } from '@/globalState/store'
import { Suwar } from '@/constants/Suwar'
import { inject, observer } from 'mobx-react'
import { MenuItem } from '@/components/MenuItem'
import { Menu } from '@/components/Menu'
import { MaterialIcons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

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

  const isCurrentReciter = props.nowPlaying?.reciterId === props.reciterId
  const isCurrentSurah = props.nowPlaying?.surahNumber === props.surahNumber

  const Title = (props: { surahNumber: number, name: string }) => {
    const secondaryTextColor = useThemeColor({}, 'secondaryText')

    return (
      <ThemedView style={{ flexDirection: 'row' }}>
        <ThemedText style={{ color: secondaryTextColor }}>{props.surahNumber}  </ThemedText>
        <ThemedText style={{ fontWeight: 'normal' }}>{props.name}</ThemedText>
      </ThemedView>
    )
  }

  return (
    <MenuItem
      title={<Title surahNumber={props.surahNumber} name={props.name} />}
      href="/player"
      onPress={handlePress}
      endIcon={isCurrentReciter && isCurrentSurah && (
        <MaterialIcons name='multitrack-audio' size={20} color='red' style={{ marginLeft: 'auto' }} />
      )}
    />
  )
}))

export default function ReciterPage () {
  const { id } = useLocalSearchParams()

  return (
    <ThemedView>
      <Menu
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
