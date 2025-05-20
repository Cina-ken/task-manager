import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



export const metadata = {
  title: 'Task Manager',
  description: 'A professional task management app',
  icons: {
  icon: '/favicon.ico',
},

};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}