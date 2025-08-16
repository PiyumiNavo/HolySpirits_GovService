import Image from "next/image";
import Link from "next/link";
import { Heading } from "@myorg/ui";
import type { Bungalow } from "../types";

interface PropertyHeaderProps {
  bungalow: Bungalow;
}

export function PropertyHeader({ bungalow }: PropertyHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-3">
      <div className="relative">
        <div className="relative h-16 sm:h-20 lg:h-24 bg-gradient-to-r from-blue-600 to-blue-800">
          <Image
            src={bungalow.image}
            alt={bungalow.name}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/40"></div>
          <div className="absolute top-1.5 left-1.5">
            <Link 
              href="/government-departments/bungalows"
              className="inline-flex items-center px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200 text-xs"
            >
              <svg className="w-2.5 h-2.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Bungalows
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2.5 lg:px-3 py-2 lg:py-2.5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-xs mb-0.5">{bungalow.department}</p>
              <Heading level={1} size="sm" className="text-white mb-0.5">
                {bungalow.name}
              </Heading>
              <p className="text-blue-100 text-xs">{bungalow.location}</p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-sm p-1.5 text-center">
                <div className="text-xs font-bold">★★★★☆</div>
                <div className="text-xs opacity-90">Government Rated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
