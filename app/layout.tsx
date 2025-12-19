import { Providers } from "./providers"
import { type ReactNode } from "react"
import { type Metadata } from "next"
import Header from "@/components/header";


export const metadata: Metadata = {
    title: "TSender",
    description: "Hyper gas-optimized bulk ERC20 token transfer",
}

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    {props.children}
                </Providers>    
            </body>
        </html>
    )
}