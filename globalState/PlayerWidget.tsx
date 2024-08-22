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
  const nowPlayingBackground = useThemeColor({}, 'secondaryBackground')

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
  React.useEffect(() => {
    props.nowPlaying.restoreState()
  }, [])
  return (
    <ThemedView>
      {!props.nowPlaying.isLoading && <PlayerWidgetView nowPlaying={props.nowPlaying}/>}
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '96%',
    left: '2%',
    bottom: 40,
    shadowColor: '#000', // TODO: light/dark
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    paddingVertical: 16,
    borderRadius: 15,
  },
})
