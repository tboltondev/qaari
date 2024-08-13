import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { ProgressBar } from '@/components/ProgressBar'

type NowPlayingProps = {
  nowPlaying: NowPlayingStore
}

const PlayerWidgetView = observer((props: NowPlayingProps) => {
  const nowPlayingBackground = useThemeColor({ dark: '#323232' }, 'background')

  return (
    <ThemedView style={[styles.container, { backgroundColor: nowPlayingBackground }]}>
      <ProgressBar nowPlaying={props.nowPlaying} isWidget />
    </ThemedView>
  )
})

type NowPlayingContainerProps = {
  nowPlaying: NowPlayingStore
}

export const PlayerWidget = observer((props: NowPlayingContainerProps) => {
  return (
    <ThemedView>
      {!props.nowPlaying.isLoading && <PlayerWidgetView nowPlaying={props.nowPlaying}/>}
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  container: {
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
})
