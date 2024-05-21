import React from 'react'

export const SidePanel = () => {
    return (

        <div className="w-60 h-screen bg-zinc-100 dark:bg-zinc-900 p-4">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-200">Tasks</h2>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        All
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Running
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Suspended
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Complete
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Incomplete
                    </li>
                </ul>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Schedules</h2>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Waiting
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11H6v-2h2v2zm4 0h-2v-2h2v2zm2 0h-2v-2h2v2z"></path>
                        </svg>
                        Complete
                    </li>
                </ul>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Tags</h2>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        Application
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        Movie
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                        Music
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        Picture
                    </li>
                    <li className="flex items-center text-zinc-600 dark:text-zinc-400">
                        <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        Other
                    </li>
                </ul>
            </div>
        </div>
    )
}
