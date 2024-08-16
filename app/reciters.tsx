import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Animated, StyleSheet } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Href } from 'expo-router'
import { inject, observer } from 'mobx-react'
import { NowPlayingStore } from '@/globalState/store'
import { MenuItem } from '@/components/MenuItem'
import { Menu } from '@/components/Menu'

type Reciter = {
  id: number
  reciter_name: string
  style: string
  translated_name: {
    name: string
    language_name: string
  }

  nowPlaying: NowPlayingStore
}

const Reciter = inject('nowPlaying')(observer((props: Reciter) => {
  function handlePress () {
    props.nowPlaying.setReciterPage({ name: props.translated_name.name, id: props.id })
    props.nowPlaying.addReciter({ name: props.translated_name.name, id: props.id })
  }

  const title = `${props.translated_name.name}${props.style ? ` (${props.style})` : ''}`

  return (
    <MenuItem
      title={title}
      href={`/reciter/${props.id}` as Href<string>}
      onPress={handlePress}
    />
  )
}))

function LoadingReciter (props: { width: number }) { // TODO: create generic LoadingMenuItem
  const opacityValue = React.useRef(new Animated.Value(0.3)).current

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [opacityValue])

  return (
    <ThemedView style={styles.menuItem}>
      <Animated.View
        style={[styles.menuItemTextLoading, { width: props.width, opacity: opacityValue }]}></Animated.View>
    </ThemedView>
  )
}

export default function RecitersPage () {
  const getReciters = async () => {
    const response = await fetch('https://api.quran.com/api/v4/resources/recitations') // TODO: move somewhere else, add localisation
    const json = await response.json()
    return json.recitations
  }

  const reciters = useQuery<Reciter[]>({
    queryKey: ['reciters'],
    queryFn: getReciters
  })

  return (
    <ThemedView style={styles.container}>
      {/*TODO: style errors*/}
      {reciters.error && <ThemedText>There was a problem loading the reciters, please try again.</ThemedText>}
      {reciters.isLoading
        ? <Menu
          data={[300, 280, 320, 240, 270, 300, 280, 320, 240, 270, 280, 320]}
          renderItem={({ item }) => <LoadingReciter width={item}/>}
        />
        : <Menu
          data={reciters.data}
          renderItem={({ item }) => <Reciter {...item} />}
          keyExtractor={(item) => `${item.reciter_name}_${item.style}`}
        />}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  menuItem: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  menuItemTextLoading: {
    height: 18,
    backgroundColor: 'grey',
    borderRadius: 20,
  }
})
