import React from "react";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Link, useLocalSearchParams} from "expo-router";
import {FlatList, StyleSheet} from "react-native";
import {store} from "@/globalState/store";
import {Suwar} from "@/constants/Suwar";
import {CurrentRecitationContext} from "@/currentRecitation/CurrentRecitationContext";

type SurahItemProps = {
    surahNumber: number
    reciterId: number
    name: string
}
function SurahItem(props: SurahItemProps) {
    const currentRecitation = React.useContext(CurrentRecitationContext)

    function handlePress() {
        // store.currentlyPlaying.setCurrentlyPlaying(props)
        currentRecitation.setSelectedSurahNumber(props.surahNumber)
        // currentRecitation.setReciter({
        //     id: props.reciterId,
        //     name: currentRecitation.reciters.find(reciter => reciter.id === props.reciterId)?.name || ''
        // })
    }

    return (
        <ThemedView style={styles.surahItem}>
            <Link href='/player' onPress={handlePress}>
                <ThemedText>{props.surahNumber}. {props.name}</ThemedText>
            </Link>
        </ThemedView>
    )
}

export default function ReciterPage() {
    const { id } = useLocalSearchParams()

    return (
        <ThemedView>
            <FlatList
                data={Suwar}
                renderItem={({ item, index }) =>
                    <SurahItem
                        surahNumber={index + 1}
                        reciterId={parseInt(id as string)}
                        name={item.name}
                    />
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