import React, {useContext} from 'react'
import {faCircleCheck, faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SelectedItemContext} from "../../../contexts/SelectedItemContext.jsx";

export const Schedules = () => {

    const {setSelectedItem} = useContext(SelectedItemContext);

    const itemClickHandler = (item) => {
        setSelectedItem(item);
    }

    let items = [
        {icon: faClock, text: 'Waiting'},
        {icon: faCircleCheck, text: 'Complete'},
    ];

    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Schedules</h2>
            <ul className="mt-2 space-y-2 ">
                {items.map((item, index) => (
                    <li
                        onClick={() => itemClickHandler(item.text)}
                        key={index}
                        className="flex items-center text-zinc-600 dark:text-zinc-400 hover:bg-white  hover:p-1 p-1 hover:border-1 hover:text-black dark:hover:bg-white dark:hover:text-black rounded-md transition-colors"
                    >
                        <FontAwesomeIcon className={`w-5 mr-2`} icon={item.icon} style={{marginRight: 8}}/>
                        <span style={{marginLeft: 8}}>{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
