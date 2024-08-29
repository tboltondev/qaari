import { useLocalSearchParams } from 'expo-router'
import { ReciterScreen } from '@/components/ReciterScreen/ReciterScreen'

export default function Reciter() {
  const { id } = useLocalSearchParams()

  return  <ReciterScreen reciterId={parseInt(id as string)} />
}
