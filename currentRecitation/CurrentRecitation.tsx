import React from "react";
import {CurrentRecitationContext, Reciter} from "@/currentRecitation/CurrentRecitationContext";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from "expo-av";
import {NowPlaying} from "@/currentRecitation/nowPlaying";

type CurrentRecitationProps = { children: React.ReactNode }

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
    const [selectedReciter, setSelectedReciter] = React.useState<Reciter>({ name: '', id: 0 })

    async function getMp3Url(surahNumber: number, reciterId: number) {
        const response = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahNumber}`) // TODO: move url
        const json = await response.json()
        return json.audio_file.audio_url
    }

    async function load(options?: { keepReciter?: boolean, playWhenLoaded?: boolean }) {
        // const query = useQuery({
        //     queryKey: ['mp3Url', surahNumber, reciterId],
        //     queryFn: () => getMp3Url(surahNumber, reciterId),
        // })

        setIsPlaying(false)

        let loadReciter = selectedReciter // TODO: too hacky
        if (options?.keepReciter && reciter.id !== 0) {
            console.log("OK\n")
            loadReciter = reciter
        }

        const mp3Url = await getMp3Url(selectedSurahNumber, loadReciter.id)

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
                setReciter(loadReciter)
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

    // console.log("CONTEXT")

    function skipForward() {
        setSelectedSurahNumber(current => current + 1)
    }

    function skipBack() {
        setSelectedSurahNumber(current => current - 1)
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
            {isLoaded && <NowPlaying
                playedDurationInMs={playedDurationInMs}
                durationInMs={durationInMs}
                surahNumber={surahNumber}
                selectedSurahNumber={selectedSurahNumber}
                isLoaded={isLoaded}
                reciter={reciter}
                selectedReciter={selectedReciter}
                play={play}
                pause={pause}
                skipForward={skipForward}
                skipBack={skipBack}
                isPlaying={isPlaying}
                load={load}
            />}
        </CurrentRecitationContext.Provider>
    )
}
