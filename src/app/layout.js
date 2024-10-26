import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next App',
  description: 'Next.js starter app',
}

export default function RootLayout({ children,}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='container'>
          <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
        </div>
        
        </body>
        
    </html>
  )
}