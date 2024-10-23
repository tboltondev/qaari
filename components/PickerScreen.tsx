import { Pressable } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { NowPlayingStore } from '@/globalState/store'

type PickerScreenProps = {
  nowPlaying?: NowPlayingStore
}

export const PickerScreen = inject('nowPlaying')(observer(
  (props: PickerScreenProps) => {
    return (
      <ThemedView>
        {props.nowPlaying?.availableRiwayat?.map(r => (
          <Pressable
            key={r.riwayah.name}
            onPress={() => props.nowPlaying?.selectRiwayah(r)}
          >
            <ThemedText>{r.riwayah.name}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    )
  }
))
