import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { NowPlayingStore } from '@/globalState/store'
import { AudioControls } from '@/components/AudioControls'
import { RecitationInfo } from '@/components/RecitationInfo'
import { ProgressBar } from '@/components/ProgressBar'

type NowPlayingProps = {
  nowPlaying: NowPlayingStore
}

const NowPlayingWidget = observer((props: NowPlayingProps) => {
  const nowPlayingBackground = useThemeColor({ dark: '#323232' }, 'background')

  return (
    <ThemedView style={[styles.nowPlaying, { backgroundColor: nowPlayingBackground }]}>
      <ProgressBar nowPlaying={props.nowPlaying} isWidget>
        <ThemedView style={styles.infoAndControls}>
          <RecitationInfo nowPlaying={props.nowPlaying} isWidget />
          <AudioControls nowPlaying={props.nowPlaying} isWidget />
        </ThemedView>
      </ProgressBar>
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
  infoAndControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
})
