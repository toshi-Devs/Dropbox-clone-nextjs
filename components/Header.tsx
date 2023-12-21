import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignOutButton, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import { ThemeToggler } from './ThemeToggler'

function Header
() {
  return (
    <header className='flex items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
            <div className='bg-blue-600 w-fit'>
                <Image 
                src='https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png' 
                className='invert'
                width={50} 
                height={50} 
                alt='logo'
                />
            </div>
            <h1 className='font-bold text-xl'>Dropbox</h1>
        </Link>

        <div className='px-5 flex space-x-2 items-center'>
            <ThemeToggler />
            <UserButton afterSignOutUrl='/'/>
            <SignedOut>
                <SignInButton afterSignInUrl='/dashboard' mode='modal' />
            </SignedOut>
        </div>

    </header>
  )
}

export default Header
