import React from 'react'
import { ThemedView } from '@/components/theme/ThemedView'
import { Suwar } from '@/constants/Suwar'
import { Menu } from '@/components/Menu/Menu'
import { SurahMenuItem } from '@/components/ReciterScreen/SurahMenuItem'

export const ReciterScreen = (props: { reciterId: number }) => {
  return (
    <ThemedView>
      <Menu
        data={Suwar}
        renderItem={({ item, index }) =>
          <SurahMenuItem
            surahNumber={index + 1}
            reciterId={props.reciterId}
            name={item.name}
          />
        }
      />
    </ThemedView>
  )
}
