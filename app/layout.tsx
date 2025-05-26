import type { Metadata } from 'next'
import './globals.css'
import { getDictionary } from "@/lib/dictionaries"; // Import the dictionary loader
import { GTM, GTMNoscript } from '@/components/gtm'


// Generate metadata based on locale
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params?.locale || 'en' // Default to English if locale is not specified
  const dictionary = await getDictionary(locale); // Fetch the dictionary

  return {
    title: dictionary.title,
    description: dictionary.description,
    // Optionally add alternates for SEO
    generator: 'v0.dev',
    authors: [{ name: 'Yuki Matsukura', url: 'https://x.com/matsubokkuri' }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'ja-JP': '/ja',
      },
    },
  }
}

// Define props type including params
interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string }; // Add params to props
}

export default function RootLayout({
  children,
  params, // Destructure params
}: Readonly<RootLayoutProps>) {
  const locale = params?.locale || 'en'; // Get locale from params, default to 'en'
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  
  // Ensure no whitespace exists between <html> and <body> tags
  // and between </body> and </html> tags to prevent hydration errors.
  return (
    <html lang={locale}>
      <head>
        {gtmId && <GTM gtmId={gtmId} />}
      </head>
      <body>
        {gtmId && <GTMNoscript gtmId={gtmId} />}
        {children}
      </body>
    </html>
  )
}
