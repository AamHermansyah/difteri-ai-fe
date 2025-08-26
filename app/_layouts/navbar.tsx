'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface IProps {
  className?: string;
}

function Navbar({ className }: IProps) {
  const pathname = usePathname();

  return (
    <nav className={cn(
      'sticky top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/10',
      pathname === '/diagnosa/hasil' && 'print:hidden'
    )}>
      <div
        className={cn(
          'px-10 md:px-4 xl:container mx-auto py-4',
          className
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-75" />
                <div className="relative bg-black rounded-lg p-2">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DifteriAI
                </h1>
                <p className="text-xs text-gray-400">CBR-ML System</p>
              </div>
            </div>
          </Link>

          {pathname !== '/diagnosa' && (
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/diagnosa">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                  Mulai Diagnosa
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar