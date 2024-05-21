import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPlay, faPause, faCircleCheck, faClockRotateLeft, faClock} from "@fortawesome/free-solid-svg-icons";

export const SidePanel = () => {
    return (

        <div className="w-60 h-screen bg-zinc-100 dark:bg-zinc-900 p-4">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-200">Tasks</h2>
                <ul className="mt-2 space-y-2 ">
                    {[
                        {icon: faBars, text: 'All'},
                        {icon: faPlay, text: 'Running'},
                        {icon: faPause, text: 'Suspended'},
                        {icon: faCircleCheck, text: 'Complete'},
                        {icon: faClockRotateLeft, text: 'Incomplete'},
                    ].map((item, index) => (
                        <li key={index} className="flex items-center text-zinc-600 dark:text-zinc-400">
                            <FontAwesomeIcon icon={item.icon} style={{marginRight: 8}}/>
                            <span style={{marginLeft: 8}}>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Schedules</h2>
                <ul className="mt-2 space-y-2 ">
                    {[
                        {icon: faClock, text: 'Waiting'},
                        {icon: faCircleCheck, text: 'Complete'},
                    ].map((item, index) => (
                        <li key={index} className="flex items-center text-zinc-600 dark:text-zinc-400">
                            <FontAwesomeIcon icon={item.icon} style={{marginRight: 8}}/>
                            <span style={{marginLeft: 8}}>{item.text}</span>
                        </li>
                    ))}
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
