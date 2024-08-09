import React from "react";
import {Pressable, StyleSheet} from "react-native";
import {CurrentRecitationContext, Reciter} from "@/currentRecitation/CurrentRecitationContext";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from "expo-av";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Link} from "expo-router";
import Theme from "@/app/theme";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Suwar} from "@/constants/Suwar";
import {Ionicons} from "@expo/vector-icons";

type CurrentRecitationProps = {
    children: React.ReactNode
}
export function CurrentRecitation(props: CurrentRecitationProps) {
    const [reciters, setReciters] = React.useState<Reciter[]>([])
    const [recitation, setRecitation] = React.useState(new Audio.Sound)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [durationInMs, setDurationInMs] = React.useState(0)
    const [playedDurationInMs, setPlayedDurationInMs] = React.useState(0)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [surahNumber, setSurahNumber] = React.useState(0)
    const [reciter, setReciter] = React.useState<Reciter>({ name: '', id: 0 })
    const [selectedSurahNumber, setSelectedSurahNumber] = React.useState(0)
    const [selectedReciter, setSelectedReciter] = React.useState({ name: '', id: 0 })

    async function getMp3Url(surahNumber: number, reciterId: number) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`) // TODO: move url
        const json = await response.json()
        return json.audio_file.audio_url
    }

    async function load(reciterId: number, surahNumber: number) {
        // const query = useQuery({
        //     queryKey: ['mp3Url', surahNumber, reciterId],
        //     queryFn: () => getMp3Url(surahNumber, reciterId),
        // })

        setIsPlaying(false)

        const mp3Url = await getMp3Url(selectedSurahNumber, selectedReciter.id)

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
                setIsLoaded(true)
                setSurahNumber(selectedSurahNumber)
                setReciter(selectedReciter)
            }

        } catch (err) {
            console.log(`Error loading mp3: ${err}`) // TODO: called everytime
        }
    }

    async function play() {
        if (!recitation) { // TODO: handle this properley
            throw new Error("Recitation not found")
        }
        await recitation.playAsync();
        setIsPlaying(true)
    }

    async function pause() {
        await recitation?.pauseAsync()
        setIsPlaying(false)
    }

    console.log("CONTEXT")

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

    const textColor = useThemeColor({}, 'text')
    const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')
    const notchColor = useThemeColor({ dark: '#444', light: 'lightgrey' }, 'secondaryText')
    const secondaryTextColor = useThemeColor({}, 'secondaryText')

    return (
        <CurrentRecitationContext.Provider value={{
            reciters,
            setReciters,
            surahNumber,
            setSurahNumber,
            selectedSurahNumber,
            setSelectedSurahNumber,
            selectedReciter,
            setSelectedReciter,
            reciter,
            setReciter,
            recitation,
            isPlaying,
            isLoaded,
            durationInMs,
            playedDurationInMs,
            load,
            play,
            pause,
        }}>
            {props.children}
            {isLoaded &&
                <ThemedView style={styles.nowPlaying}>
                    <Link href='/player?nowPlaying=true' asChild>
                        <Pressable style={styles.nowPlayingPressable}>

                            {/*TODO: create progress bar component instead of duplicating here and player.tsx*/}
                            <ThemedView style={styles.progressBar}>
                                <ThemedView
                                    style={[
                                        styles.progressBarActive,
                                        { width: `${playedDurationInMs / durationInMs * 100}%` }
                                    ]}
                                ></ThemedView>
                            </ThemedView>

                            <ThemedView style={styles.progressBarTimes}>

                                <ThemedView style={styles.recitationInfo}>
                                    <ThemedText>{Suwar[selectedSurahNumber - 1].name}</ThemedText>
                                    <ThemedText>
                                        {isLoaded
                                            ? reciter.name
                                            : selectedReciter.name
                                        }
                                    </ThemedText>
                                </ThemedView>

                                <Pressable onPress={isPlaying ? pause : play}>
                                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color={textColor}/>
                                </Pressable>

                            </ThemedView>

                        </Pressable>
                    </Link>
                </ThemedView>
            }
        </CurrentRecitationContext.Provider>
    )
}

const styles = StyleSheet.create({
    nowPlaying: {
        position: "absolute",
        width: "94%",
        left: "3%",
        bottom: 40,
        // backgroundColor: "#44444499",
        backgroundColor: "#34343499",
        // backgroundColor: "#232323",
        shadowColor: "#222",
        shadowRadius: 15,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        paddingVertical: 16,
        borderRadius: 15,
    },
    nowPlayingPressable: {
        width: "100%",
        alignItems: "center",
    },
    progressBar: {
        width: "94%",
        backgroundColor: "#444",
        height: 4,
        borderRadius: 20,
    },
    progressBarActive: {
        position: "absolute",
        backgroundColor: "#fff",
        height: 4,
        borderRadius: 20,
    },
    progressBarTimes: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
        backgroundColor: "transparent",
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
    },
    recitationInfo: {
        backgroundColor: "transparent",
    },
})