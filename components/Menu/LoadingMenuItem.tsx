import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'

export const LoadingMenuItem = (props: { width: number }) => {
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

const styles = StyleSheet.create({
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