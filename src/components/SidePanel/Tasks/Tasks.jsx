import React, {useContext} from 'react'
import {faBars, faCircleCheck, faClockRotateLeft, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SelectedItemContext} from "../../../contexts/SelectedItemContext.jsx";
import {FILTER_ALL} from "../../../common/constants/index.js";

export const Tasks = () => {

    const {selectedItem, setSelectedItem} = useContext(SelectedItemContext);

    const itemClickHandler = (item) => {
        setSelectedItem(item);
    }

    const items = [
        {icon: faBars, text: FILTER_ALL},
        {icon: faPlay, text: 'Running'},
        {icon: faPause, text: 'Suspended'},
        {icon: faCircleCheck, text: 'Complete'},
        {icon: faClockRotateLeft, text: 'Incomplete'},
    ];

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-200">Tasks</h2>
            <ul className="mt-2 space-y-2 ">
                {items.map((item, index) => (
                    <li
                        onClick={() => itemClickHandler(item.text)}
                        key={index}
                        className={`flex items-center text-zinc-600 dark:text-zinc-400 p-1 rounded-md transition-colors ${
                            selectedItem === item.text
                                ? 'bg-white text-black border-1'
                                : 'hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black'
                        }`}>
                        <FontAwesomeIcon className={`w-5 mr-2`} icon={item.icon} style={{marginRight: 8}}/>
                        <span style={{marginLeft: 8}}>{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
