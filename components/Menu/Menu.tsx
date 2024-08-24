import React from 'react'
import { FlatList, FlatListProps, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

export const Menu = (props: FlatListProps<any>) => {
  const separatorColor = useThemeColor({}, 'separator')

  const Separator = () => <ThemedView style={[styles.separator, { backgroundColor: separatorColor }]}/>

  return <FlatList
    ItemSeparatorComponent={Separator}
    contentContainerStyle={styles.contentContainerStyle}
    {...props}
  />
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 200,
  },
})
