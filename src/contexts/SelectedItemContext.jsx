// SelectedItemContext.js
import {createContext, useState} from 'react';
import {FILTER_ALL} from "../common/constants/index.js";

const SelectedItemContext = createContext();

const SelectedItemProvider = ({children}) => {
  const [selectedItem, setSelectedItem] = useState(FILTER_ALL);


  return (<SelectedItemContext.Provider value={{selectedItem, setSelectedItem}}>
      {children}
    </SelectedItemContext.Provider>);
};

export {SelectedItemProvider, SelectedItemContext};