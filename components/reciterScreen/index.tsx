import React from 'react'
import { ThemedView } from '@/theme'
import SurahNames from '@/constants/SurahNames.json'
import { Menu } from '@/components/menu/Menu'
import { SurahMenuItem } from '@/components/reciterScreen/SurahMenuItem'

export const ReciterScreen = (props: { reciterId: number }) => {
  return (
    <ThemedView>
      <Menu
        data={SurahNames}
        renderItem={({ item, index }) =>
          // TODO: show surah name in arabic and localised
          <SurahMenuItem
            surahNumber={index + 1}
            reciterId={props.reciterId}
            name={item.name}
          />}
      />
    </ThemedView>
  )
}
