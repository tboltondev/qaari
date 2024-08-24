import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView } from '@/components/theme/ThemedView'
import { ProgressBar } from '@/components/Player/ProgressBar'

type PlayerWidgetProps = {
  nowPlaying: NowPlayingStore
}

export const PlayerWidget = observer((props: PlayerWidgetProps) => {
  const widgetBackground = useThemeColor({ light: '#fff' }, 'secondaryBackground')

  React.useEffect(() => {
    props.nowPlaying.restoreState()
  }, [])

  return !props.nowPlaying.isLoading && (
    <ThemedView style={[styles.container, { backgroundColor: widgetBackground }]}>
      <ProgressBar nowPlaying={props.nowPlaying} isWidget/>
    </ThemedView>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '96%',
    left: '2%',
    bottom: 40,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    paddingVertical: 16,
    borderRadius: 15,
  },
})
