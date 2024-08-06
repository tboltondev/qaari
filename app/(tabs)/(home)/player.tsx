import React from "react";
import {GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet} from "react-native";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from "expo-av"
import {ThemedView} from "@/components/ThemedView";
import {Ionicons} from "@expo/vector-icons";
import {store} from "@/globalState/store";
import {ThemedText} from "@/components/ThemedText";
import {useQuery} from "@tanstack/react-query";
import {Suwar} from "@/constants/Suwar";

export default function Player() {
    const [recitation, setRecitation] = React.useState<Audio.Sound>()
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
    const [durationInMs, setDurationInMs] = React.useState<number>(0)
    const [playedDurationInMs, setPlayedDurationInMs] = React.useState<number>(0)
    const [progressBarWidth, setProgressBarWidth] = React.useState<number>(0)
    const {surahNumber, reciterId} = store.currentlyPlaying

    async function getMp3Url(surahNumber: number, reciterId: string) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`)
        const json = await response.json()
        return json.audio_file.audio_url
    }
    const query = useQuery({
        queryKey: ['mp3Url', surahNumber, reciterId],
        queryFn: () => getMp3Url(surahNumber, reciterId),
    })

    async function loadSound(mp3Url: string) {
        try {
            const sound = new Audio.Sound()
            await sound.loadAsync({uri: mp3Url})

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setPlayedDurationInMs(status.positionMillis)
                }
            })

            const status = await sound.getStatusAsync()

            if (status.isLoaded) {
                setDurationInMs(status.durationMillis || 0)
                setRecitation(sound);
            }

        } catch (err) {
            console.log(`Error loading mp3: ${err}`) // TODO: called everytime
        }
    }

    function displayTime(ms: number) {
        const seconds = ms / 1000
        const hours = Math.floor(seconds / 3600)
        const remainingSecsAfterHrs = seconds % 3600
        const minutes = Math.floor(remainingSecsAfterHrs / 60)
        const remainingSecsAfterMins = Math.round(remainingSecsAfterHrs % 60)

        const displayMins = minutes < 10 ? `0${minutes}` : `${minutes}`
        const displaySecs = remainingSecsAfterMins < 10 ? `0${remainingSecsAfterMins}` : `${remainingSecsAfterMins}`

        if (hours > 0) {
            return `${hours}:${displayMins}:${displaySecs}`
        }
        return `${displayMins}:${displaySecs}`
    }

    async function playSound() {
        if (!recitation) { // TODO: handle this properley
            throw new Error("Recitation not found")
        }
        await recitation.playAsync();
        setIsPlaying(true)
    }

    async function pauseSound() {
        await recitation?.pauseAsync()
        setIsPlaying(false)
    }

    function handleLayoutChange(event: LayoutChangeEvent) {
        setProgressBarWidth(event.nativeEvent.layout.width)
    }

    async function handleProgressBarPress(event: GestureResponderEvent) { // TODO: add seeking by touch drag
        const percentage = event.nativeEvent.locationX / progressBarWidth
        const newPositionInMs = percentage * durationInMs
        await recitation?.setPositionAsync(newPositionInMs)
    }

    React.useEffect(() => {
        loadSound(query.data)
    }, [query.data])

    React.useEffect(() => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
        });

        return recitation
            ? () => {
                recitation.unloadAsync()
            }
            : undefined;
    }, [recitation]);

    return (
        <ThemedView style={styles.playerContainer}>

            <ThemedView style={styles.progressBarContainer}>
                <ThemedText>{displayTime(playedDurationInMs)}</ThemedText>
                <Pressable
                    style={styles.progressBarPressable}
                    onLayout={handleLayoutChange}
                    onPress={handleProgressBarPress}
                >
                    <ThemedView style={styles.progressBar}>
                        <ThemedView
                            style={[
                                styles.progressBarActive,
                                {width: `${playedDurationInMs / durationInMs * 100}%`}
                            ]}
                        ></ThemedView>
                    </ThemedView>
                </Pressable>
                <ThemedText>{durationInMs === 0 ? '--:--' : displayTime(durationInMs)}</ThemedText>
            </ThemedView>

            <ThemedText>{Suwar[surahNumber - 1].name}</ThemedText>
            <ThemedText>{store.reciter.name}</ThemedText>

            <Pressable onPress={isPlaying ? pauseSound : playSound}>
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color='white'/>
            </Pressable>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    progressBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressBar: {
        width: "100%",
        backgroundColor: "grey", // TODO: use theme
        height: 4,
        borderRadius: 20,
    },
    progressBarActive: {
        position: "absolute",
        backgroundColor: "white", // TODO: use theme
        height: 4,
        width: 0,
        borderRadius: 20,
    },
    progressBarPressable: {
        width: "60%",
        height: 16,
        marginHorizontal: 6,
        backgroundColor: "transparent",
        justifyContent: "center",
    }
})