import {Stack} from "expo-router";
import {store} from "@/globalState/store";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="reciters" options={{ title: "Reciters" }} />
            <Stack.Screen name="reciter/[id]" options={{ title: store.reciter.name }} />
            <Stack.Screen name="player" options={{ presentation: "modal", headerShown: false }} />
        </Stack>
    )
}