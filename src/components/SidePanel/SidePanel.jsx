import React from 'react';
import {Tasks} from "./Tasks/Tasks.jsx";
import {Schedules} from "./Schedules/Schedules.jsx";
import {Tags} from "./Tags/Tags.jsx";

export const SidePanel = () => {
    return (
        <div className="w-60 h-screen bg-zinc-100 dark:bg-zinc-900 p-4 overflow-y-auto scrollbar-hid">
            <Tasks/>
            <Schedules/>
            <Tags/>
        </div>
    )
}
