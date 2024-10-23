import { Link } from 'expo-router'
import { ThemedView } from '@/components/theme/ThemedView'
import { ThemedText } from '@/components/theme/ThemedText'
import { Pressable } from 'react-native'

type PickerProps = {
  value: string
  data: string[]
  onChange: (value: string) => void
}

export const Picker = (props: PickerProps) => {
  return (
    <Link href="/picker" asChild>
      <Pressable>
        <ThemedText>{props.value}</ThemedText>
      </Pressable>
    </Link>
  )
}
