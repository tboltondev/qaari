import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ThemedTextInput } from '@/components/theme/ThemedTextInput'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView, ThemedViewProps } from '@/components/theme/ThemedView'

type SearchBarProps = ThemedViewProps & {
  value: string
  onChangeText: (text: string) => void
}

export const SearchBar = (props: SearchBarProps) => {
  const inputRef = React.useRef<TextInput>(null)
  const searchBackground = useThemeColor({}, 'secondaryBackground')
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  function blurInput () {
    props.onChangeText('')
    inputRef.current?.blur()
  }

  return (
    <ThemedView style={styles.searchBarContainer}>
      <ThemedTextInput
        ref={inputRef}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder="Search"
        enterKeyHint="search"
        returnKeyType="search"
        placeholderTextColor={secondaryTextColor}
        style={[styles.searchBar, { backgroundColor: searchBackground }]}
      />
      {props.value.length > 0 &&
        <Ionicons
          name="close-circle"
          size={18}
          onPress={blurInput}
          color={secondaryTextColor}
          style={styles.searchBarIcon}
        />
      }
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    justifyContent: 'center',
  },
  searchBar: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 10,
    fontSize: 18,
  },
  searchBarIcon: {
    position: 'absolute',
    right: 25,
  },
})
