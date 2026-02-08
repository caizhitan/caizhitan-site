import React from 'react'

export default function Header() {
    return (
        <header className="flex flex-row w-full h-auto items-center justify-between p-4 text-black">
            {/* Left side: CZT in Bebas Neue */}
            <h1 className="text-3xl font-primary tracking-wider">
                CZT
            </h1>

            <div className="flex flex-col items-end">
                <p className="text-xl font-secondary">
                    [2026]
                </p>
                <p className="text-xl font-secondary">
                    [Singapore]
                </p>
            </div>
        </header>
    )
}