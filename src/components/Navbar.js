'use client';

import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {isSignedIn && (
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          )}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link href="/sign-in" className="hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}