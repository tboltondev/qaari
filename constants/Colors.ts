/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4464ad'
const tintColorDark = '#05b2dc'

export const Colors = {
  light: {
    text: '#11181C',
    secondaryText: '#687076',
    background: '#fff',
    secondaryBackground: '#eeeeee',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    activeListItem: '#E1E1E1',
    disabled: '#ddd',
    separator: '#eee',
    versionNumber: '#bbb',
    shadow: '#000',
  },
  dark: {
    text: '#ECEDEE',
    secondaryText: '#9BA1A6',
    background: '#151718',
    secondaryBackground: '#333333',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    activeListItem: '#2A2D30',
    disabled: '#333',
    separator: '#333',
    versionNumber: '#555',
    shadow: '#555',
  },
}
