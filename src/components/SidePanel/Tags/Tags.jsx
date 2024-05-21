import React from 'react'

export const Tags = () => {
    let items = [
        {color: "bg-green-500", label: "Application"},
        {color: "bg-red-500", label: "Movie"},
        {color: "bg-yellow-500", label: "Music"},
        {color: "bg-blue-500", label: "Picture"},
        {color: "bg-purple-500", label: "Other"}
    ];

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Tags</h2>
            <ul className="mt-2 space-y-2">
                {items.map((item, index) => (
                    <li key={index}
                        className="flex items-center text-zinc-600 dark:text-zinc-400 hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black rounded-md transition-colors"
                    >
                        <span className={`w-3 h-3 ${item.color} rounded-full mr-2`}></span>
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}
