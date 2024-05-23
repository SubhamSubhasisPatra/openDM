import React from "react";
import {SidePanel} from "../SidePanel/SidePanel.jsx";
import {MainPanel} from "../MainPanel/MainPanel.jsx";
import {SelectedItemProvider} from "../../contexts/SelectedItemContext.jsx";

export default function Home() {

    return (
        <SelectedItemProvider>
            <div className="flex h-screen">
                <SidePanel/>
                <MainPanel/>
            </div>
        </SelectedItemProvider>
    );
}
