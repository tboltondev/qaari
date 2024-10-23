import { Picker, PickerProps } from '@react-native-picker/picker'
import { useThemeColor } from '@/hooks/useThemeColor'

type ThemedPickerProps = PickerProps & {}

export const ThemedPicker = (props: ThemedPickerProps) => {
  const color = useThemeColor({}, "text")
  const backgroundColor = useThemeColor({}, "background")

  return (
    <Picker
      style={{ backgroundColor }}
      itemStyle={{ color, backgroundColor }}
      {...props}
    >
      {props.children}
    </Picker>
  )
}

export const ThemedPickerItem = Picker.Item
