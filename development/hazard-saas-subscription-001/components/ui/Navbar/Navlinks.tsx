'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import Integrove from '@/components/icons/Integrove';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        {/* <Link href="/" className={s.logo} aria-label="Logo">
          <Integrove />
        </Link> */}

        <Link href="/" className={s.link}>
        <span className="mt-4 border rounded-full border-zinc-900">
            <Integrove />
        </span>
         <span className="text-4xl">HazardAI</span>
         </Link>

            
        <nav className="ml-6 space-x-2 lg:block">
        {/* <Link href="/" className={s.link}>
            Home
          </Link> */}
          <Link href="/about" className={s.link}>
            About
          </Link>
          <Link href="/pricing" className={s.link}>
            Pricing
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
          {user && (
            <Link href="/dashboard" className={s.link}>
              Hazard App
            </Link>
          )}
            {/* <Link href="/companyRegistration" className={s.link}>
            companyRegistration
          </Link> */}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={`${s.link} text-yellow-400`}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={`${s.link} text-yellow-400`}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
