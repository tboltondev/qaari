import React from 'react'
import { SectionList, SectionListProps, StyleSheet } from 'react-native'
import { ThemedView } from '@/components/theme/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'

// TODO: fix any
export const SectionMenu = (props: SectionListProps<any>) => {
  const separatorColor = useThemeColor({}, 'separator')

  const Separator = () => <ThemedView style={[styles.separator, { backgroundColor: separatorColor }]} />

  return (
    <SectionList
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '90%',
    alignSelf: 'center'
  },
  contentContainerStyle: {
    paddingBottom: 200
  }
})
