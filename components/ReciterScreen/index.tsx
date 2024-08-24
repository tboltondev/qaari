import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { Suwar } from '@/constants/Suwar'
import { Menu } from '@/components/Menu'
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
