import React from 'react'
import { FlatList, FlatListProps, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'

export const Menu = (props: FlatListProps<any>) => {
  const Seperator = () => <ThemedView style={styles.seperator}/>

  return <FlatList
    ItemSeparatorComponent={Seperator}
    contentContainerStyle={styles.contentContainerStyle}
    {...props}
  />
}

const styles = StyleSheet.create({
  seperator: {
    backgroundColor: '#333',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 200,
  },
})