import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Link, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet} from "react-native";
import {store} from "@/globalState/store";
import {Suwar} from "@/constants/Suwar";

type SurahItemProps = {
    surahNumber: number
    reciterId: string
    name: string
}
function SurahItem(props: SurahItemProps) {
    function handlePress() {
        console.log(props.surahNumber)
        store.currentlyPlaying.setCurrentlyPlaying(props)
    }

    return (
        <ThemedView style={styles.surahItem}>
            <Link href="/player" onPress={handlePress}>
                <ThemedText>{props.surahNumber}. {props.name}</ThemedText>
            </Link>
        </ThemedView>
    )
}

export default function Reciter() {
    const { id } = useLocalSearchParams()

    return (
        <ThemedView>
            <FlatList
                data={Suwar}
                renderItem={({ item, index }) =>
                    <SurahItem surahNumber={index + 1} reciterId={id as string} name={item.name} />
                }
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    surahItem: {
        padding: 20
    }
})