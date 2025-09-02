import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="px-10 md:px-4 xl:container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AyoCekDifteri
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="mailto:amzhermanzyah@gmail.com"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Hubungi via Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer