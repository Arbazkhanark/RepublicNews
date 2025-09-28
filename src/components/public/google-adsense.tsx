"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: { push: (params: object) => void }[];
  }
}

interface GoogleAdSenseProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  fullWidthResponsive?: boolean
  className?: string
}

export function GoogleAdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

// AdSense script component for layout
export function GoogleAdSenseScript() {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  )
}