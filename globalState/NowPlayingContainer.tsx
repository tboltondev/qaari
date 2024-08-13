import { ThemedView } from '@/components/ThemedView'
import { Link } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Suwar } from '@/constants/Suwar'
import { useThemeColor } from '@/hooks/useThemeColor'
import React from 'react'
import { observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { AudioControls } from '@/components/AudioControls'

type NowPlayingProps = {
  nowPlaying: NowPlayingStore
}

const NowPlayingWidget = observer((props: NowPlayingProps) => {
  const nowPlayingBackground = useThemeColor({ dark: '#323232' }, 'background')
  const textColor = useThemeColor({}, 'text')
  const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')

  return (
    <ThemedView style={[styles.nowPlaying, { backgroundColor: nowPlayingBackground }]}>
      <Link href="/player" asChild>
        <Pressable style={styles.nowPlayingPressable}>

          {/*TODO: create progress bar component instead of duplicating here and player.tsx*/}
          <ThemedView style={[styles.progressBar, { backgroundColor: progressBarColor }]}>
            <ThemedView
              style={[
                styles.progressBarActive,
                {
                  width: `${props.nowPlaying.percentageElapsed}%`,
                  backgroundColor: textColor,
                }
              ]}
            ></ThemedView>
          </ThemedView>

          <ThemedView style={styles.infoAndControls}>

            <ThemedView style={styles.recitationInfo}>
              <ThemedText>{!props.nowPlaying.isLoading && Suwar[props.nowPlaying.surahNumber - 1].name}</ThemedText>
              <ThemedText>
                {!props.nowPlaying.isLoading && props.nowPlaying.currentReciter?.name}
              </ThemedText>
            </ThemedView>

            <AudioControls isWidget nowPlaying={props.nowPlaying} />

          </ThemedView>

        </Pressable>
      </Link>
    </ThemedView>
  )
})

type NowPlayingContainerProps = {
  nowPlaying: NowPlayingStore
}

export const NowPlayingContainer = observer((props: NowPlayingContainerProps) => {
  return (
    <ThemedView>
      {!props.nowPlaying.isLoading && <NowPlayingWidget nowPlaying={props.nowPlaying}/>}
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  nowPlaying: {
    position: 'absolute',
    width: '94%',
    left: '3%',
    bottom: 40,
    shadowColor: '#222', // TODO: light/dark
    shadowRadius: 15,
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    paddingVertical: 16,
    borderRadius: 15,
  },
  nowPlayingPressable: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '94%',
    height: 4,
    borderRadius: 20,
  },
  progressBarActive: {
    position: 'absolute',
    height: 4,
    borderRadius: 20,
  },
  infoAndControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
  },
  recitationInfo: {
    backgroundColor: 'transparent',
  },
})
