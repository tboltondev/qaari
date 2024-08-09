import React from "react";
import {GestureResponderEvent, LayoutChangeEvent, Pressable, StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {Ionicons} from "@expo/vector-icons";
import {ThemedText} from "@/components/ThemedText";
import {Suwar} from "@/constants/Suwar";
import {useThemeColor} from "@/hooks/useThemeColor";
import {CurrentRecitationContext} from "@/currentRecitation/CurrentRecitationContext";
import {useLocalSearchParams} from "expo-router";

export default function Player() {
    const [progressBarWidth, setProgressBarWidth] = React.useState<number>(0)
    const currentRecitation = React.useContext(CurrentRecitationContext)

    console.log("RENDER")

    const params = useLocalSearchParams() // maybe useGlobalSearchParams

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

    function handleProgressBarLayoutChange(event: LayoutChangeEvent) {
        setProgressBarWidth(event.nativeEvent.layout.width)
    }

    async function handleProgressBarPress(event: GestureResponderEvent) { // TODO: add seeking by touch drag
        const percentage = event.nativeEvent.locationX / progressBarWidth
        const newPositionInMs = percentage * currentRecitation.durationInMs
        await currentRecitation.recitation?.setPositionAsync(newPositionInMs)
    }

    function handleForward() {
        console.log("forward")
        // currentRecitation.setSurahNumber(current => current + 1)
        // store.currentlyPlaying.setCurrentlyPlaying({
        //     ...store.currentlyPlaying,
        //     surahNumber: store.currentlyPlaying.surahNumber + 1
        // })
    }

    const textColor = useThemeColor({}, 'text')
    const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')
    const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
    const secondaryTextColor = useThemeColor({}, 'secondaryText')

    React.useEffect(() => {
        const isChangingRecitation = (currentRecitation.surahNumber !== currentRecitation.selectedSurahNumber)
            || (currentRecitation.reciter.id !== currentRecitation.selectedReciter.id)
        if (!params.nowPlaying && isChangingRecitation) {
            currentRecitation.load(currentRecitation.selectedReciter.id, currentRecitation.selectedSurahNumber)
        }
    }, [
        currentRecitation.surahNumber,
        currentRecitation.selectedSurahNumber,
        currentRecitation.reciter.id,
        currentRecitation.selectedReciter.id,
        params.nowPlaying,
    ])

    return (
        <ThemedView style={styles.playerContainer}>

            <ThemedView style={[styles.notch, { backgroundColor: notchColor }]}></ThemedView>

            <ThemedView style={styles.image}></ThemedView>

            <ThemedView style={styles.progressBarContainer}>
                <Pressable style={styles.progressBarPressable} onPress={handleProgressBarPress}>
                    <ThemedView
                        style={[
                            styles.progressBar,
                            { backgroundColor: progressBarColor }
                        ]}
                        onLayout={handleProgressBarLayoutChange}
                    >
                        <ThemedView style={[
                                styles.progressBarActive,
                                {
                                    width: `${currentRecitation.playedDurationInMs / currentRecitation.durationInMs * 100}%`,
                                    backgroundColor: textColor,
                                }
                            ]}></ThemedView>
                    </ThemedView>
                    <ThemedView style={styles.progressBarTimes}>
                        <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
                            {displayTime(currentRecitation.playedDurationInMs)}
                        </ThemedText>
                        <ThemedText style={[styles.timeText, { color: secondaryTextColor }]}>
                            {currentRecitation.durationInMs === 0
                                ? '--:--'
                                : displayTime(currentRecitation.durationInMs)
                            }
                        </ThemedText>
                    </ThemedView>
                </Pressable>
            </ThemedView>

            <ThemedView style={styles.recitationInfo}>
                <ThemedText>{Suwar[currentRecitation.selectedSurahNumber - 1].name}</ThemedText>
                <ThemedText>
                    {currentRecitation.isLoaded
                        ? currentRecitation.reciter.name
                        : currentRecitation.selectedReciter.name
                    }
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.controls}>
                <Pressable>{/*TODO*/}
                    <Ionicons name='play-back' size={36} color={textColor} />
                </Pressable>
                <Pressable onPress={currentRecitation.isPlaying ? currentRecitation.pause : currentRecitation.play}>
                    <Ionicons name={currentRecitation.isPlaying ? 'pause' : 'play'} size={48} color={textColor}/>
                </Pressable>
                <Pressable onPress={handleForward}>
                    <Ionicons name='play-forward' size={36} color={textColor} />
                </Pressable>
            </ThemedView>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    notch: {
        width: 40,
        height: 4,
        position: 'absolute',
        top: 20,
        borderRadius: 10,
    },
    image: {
        width: 300,
        height: 300,
        backgroundColor: '#222',
        borderRadius: 5,
    },
    recitationInfo: {
        alignItems: "center",
    },
    controls: {
        width: '70%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    progressBarContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressBar: {
        width: "100%",
        height: 4,
        borderRadius: 20,
    },
    progressBarActive: {
        position: "absolute",
        height: 4,
        width: 0,
        borderRadius: 20,
    },
    progressBarPressable: {
        position: "absolute",
        width: 300,
        paddingTop: 20,
        top: -20,
        marginHorizontal: 6,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    progressBarTimes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
    },
})