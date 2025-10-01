import {ThemedView} from "@/components/theme/ThemedView";
import {ThemedText} from "@/components/theme/ThemedText";
import {StyleSheet} from "react-native";

interface AyahTextProps {
  text: string;
  translationText: string;
}

export const AyahText = (props: AyahTextProps) => {
  return (
    <ThemedView style={styles.textContainer}>
      <ThemedText style={styles.text}>
        {props.text}
      </ThemedText>
      <ThemedText style={styles.translationText}>
        {props.translationText}
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: '90%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    fontFamily: 'Uthmani',
    fontSize: 26,
    lineHeight: 44,
    textAlign: 'center'
  },
  translationText: {
    fontSize: 16,
    textAlign: 'center'
  },
})
