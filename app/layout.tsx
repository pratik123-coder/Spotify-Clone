import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from "@/components/Sidebar";
import SuperbaseProvider from '@/providers/SuperbaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Player from '@/components/Player';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify-Clone',
  description: 'Created By Pratik Mohanty on NextJS, Tailwind CSS, Supabase, Stripe, PostgreSQL',
};

export const revalidate=0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs= await getSongsByUserId();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <SuperbaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SuperbaseProvider>
      </body>
    </html>
  );
}
