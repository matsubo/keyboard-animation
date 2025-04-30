import KeyboardDisplay from "@/components/keyboard-display";
import { getDictionary } from "@/lib/dictionaries"; // Import the dictionary loader
import { GoogleAnalytics } from '@next/third-parties/google';
import Link from "next/link";

// Define props type including params
interface HomePageProps {
  params: { locale: string };
}

export default async function Home({ params }: HomePageProps) {
  const locale = params?.locale || 'en'; // Get locale from params, default to 'en'
  const dictionary = await getDictionary(locale); // Fetch the dictionary
  const version = process.env.npm_package_version || '0.1.0'; // Or get version differently
  const githubUrl = "https://github.com/matsubo/keyboard-animation"; // Replace with your repo URL

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-0 overflow-hidden relative">
      <KeyboardDisplay dictionary={dictionary} /> {/* Pass dictionary as prop */}
      <GoogleAnalytics gaId="G-WX3ZJHM72Z" />
      <footer className="fixed bottom-4 right-4 text-xs text-gray-600 z-10">
        <span>v{version}</span>
        <span className="mx-2">|</span>
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
          GitHub
        </Link>
      </footer>
    </main>
  );
}
