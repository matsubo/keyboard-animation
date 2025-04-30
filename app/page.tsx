import KeyboardDisplay from "@/components/keyboard-display"
import { GoogleAnalytics } from '@next/third-parties/google'


export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-0 overflow-hidden">
      <KeyboardDisplay />
      <GoogleAnalytics gaId="G-WX3ZJHM72Z" />
    </main>
  )
}

