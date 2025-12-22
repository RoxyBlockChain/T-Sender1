"use client"

import { useState } from "react"
import AirdropForm from "@/components/AirdropForm"
import { useConnection } from "wagmi"

export default function HomeContent() {
    const [isUnsafeMode, setIsUnsafeMode] = useState(false)
    const { isConnected } = useConnection()
    return (
        <main>
            {isConnected ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    <AirdropForm />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <h2 className="text-xl font-medium text-zinc-600">
                        Please connect a wallet...
                    </h2>
                </div>
            )
            }
        </main>
    )
}