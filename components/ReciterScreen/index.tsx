import React from 'react'
import { ThemedView } from '@/components/theme/ThemedView'
import SurahNames from '@/content/quran/surahNames.en.json'
import { Menu } from '@/components/Menu/Menu'
import { SurahMenuItem } from '@/components/ReciterScreen/SurahMenuItem'

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
