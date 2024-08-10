import {ThemedView} from "@/components/ThemedView";
import {Link} from "expo-router";
import {Pressable, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";
import {Reciter} from "@/currentRecitation/CurrentRecitationContext";
import {Suwar} from "@/constants/Suwar";
import {useThemeColor} from "@/hooks/useThemeColor";
import React from "react";

type NowPlayingProps = {
    playedDurationInMs: number
    durationInMs: number
    surahNumber: number
    selectedSurahNumber: number
    isLoaded: boolean
    reciter: Reciter
    selectedReciter: Reciter
    play: () => void
    pause: () => void
    skipForward: () => void
    skipBack: () => void
    isPlaying: boolean
    load: (options?: { keepReciter: boolean }) => Promise<void>
}

export function NowPlaying(props: NowPlayingProps) {

    const nowPlayingBackground = useThemeColor({ dark: "#323232" }, 'background')
    const textColor = useThemeColor({}, 'text')
    const progressBarColor = useThemeColor({ dark: 'grey', light: 'lightgrey' }, 'secondaryText')

    React.useEffect(() => {
        const isChangingRecitation = (props.surahNumber !== props.selectedSurahNumber)
            // || (props.reciter.id !== props.selectedReciter.id)
        if (isChangingRecitation) {
            props.load({ keepReciter: true })
        }
    }, [
        props.surahNumber,
        props.selectedSurahNumber,
        // props.reciter.id,
        // props.selectedReciter.id,
    ])

    return (
       <ThemedView style={[styles.nowPlaying, { backgroundColor: nowPlayingBackground }]}>
           <Link href='/player?nowPlaying=true' asChild>
               <Pressable style={styles.nowPlayingPressable}>

                   {/*TODO: create progress bar component instead of duplicating here and player.tsx*/}
                   <ThemedView style={[styles.progressBar, { backgroundColor: progressBarColor }]}>
                       <ThemedView
                           style={[
                               styles.progressBarActive,
                               {
                                   width: `${props.playedDurationInMs / props.durationInMs * 100}%`,
                                   backgroundColor: textColor,
                               }
                           ]}
                       ></ThemedView>
                   </ThemedView>

                   <ThemedView style={styles.infoAndControls}>

                       <ThemedView style={styles.recitationInfo}>
                           <ThemedText>{Suwar[props.selectedSurahNumber - 1].name}</ThemedText>
                           <ThemedText>
                               {props.isLoaded
                                   ? props.reciter.name
                                   : props.selectedReciter.name
                               }
                           </ThemedText>
                       </ThemedView>

                       <ThemedView style={styles.controls}>
                           <Pressable onPress={props.skipBack}>
                               <Ionicons name='play-back' size={36} color={textColor} />
                           </Pressable>
                           <Pressable onPress={props.isPlaying ? props.pause : props.play} style={styles.playButton}>
                               <Ionicons name={props.isPlaying ? 'pause' : 'play'} size={32} color={textColor}/>
                           </Pressable>
                           <Pressable onPress={props.skipForward}>
                               <Ionicons name='play-forward' size={36} color={textColor} />
                           </Pressable>
                       </ThemedView>

                   </ThemedView>

               </Pressable>
           </Link>
       </ThemedView>
   )
}

const styles = StyleSheet.create({
    nowPlaying: {
        position: "absolute",
        width: "94%",
        left: "3%",
        bottom: 40,
        shadowColor: "#222", // TODO: light/dark
        shadowRadius: 15,
        shadowOpacity: 1,
        shadowOffset: { width: 10, height: 10 },
        paddingVertical: 16,
        borderRadius: 15,
    },
    nowPlayingPressable: {
        width: "100%",
        alignItems: "center",
    },
    progressBar: {
        width: "94%",
        height: 4,
        borderRadius: 20,
    },
    progressBarActive: {
        position: "absolute",
        height: 4,
        borderRadius: 20,
    },
    infoAndControls: {
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
    playButton: {
        marginHorizontal: 20,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
    }
})
