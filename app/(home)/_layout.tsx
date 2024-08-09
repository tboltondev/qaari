import React from "react";
import {Stack} from "expo-router";
import {store} from "@/globalState/store";
import {CurrentRecitationContext} from "@/currentRecitation/CurrentRecitationContext";

export default function HomeLayout() {
    const currentRecitation = React.useContext(CurrentRecitationContext)
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="reciters" options={{ title: "Reciters" }} />
            {/*<Stack.Screen name="reciter/[id]" options={{ title: store.reciter.name }} />*/}
            <Stack.Screen name="reciter/[id]" options={{ title: currentRecitation.selectedReciter.name }} />
            <Stack.Screen name="player" options={{ presentation: "modal", headerShown: false }} />
        </Stack>
    )
}