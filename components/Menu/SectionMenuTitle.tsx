import React from 'react'
import {useThemeColor} from "@/hooks/useThemeColor";
import {ThemedText} from "@/components/theme/ThemedText";
import {StyleSheet} from "react-native";

interface SectionMenuTitleProps {
  children?: React.ReactNode;
}

export const SectionMenuTitle = (props: SectionMenuTitleProps) => {
  const secondaryTextColor = useThemeColor({}, 'secondaryText')

  return (
    <ThemedText style={{ ...styles.titleText, color: secondaryTextColor }}>
      {props.children}
    </ThemedText>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  }
})
