import React from 'react'

export default function Button({ onClick, children }) {
    return (
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
            {children}
        </button>

    )
}