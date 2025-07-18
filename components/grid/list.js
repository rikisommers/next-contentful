import React from "react";
import GridList from "./grid-list";
import { gridThemes, listThemes} from "../../utils/theme";

import { useThemeContext } from "../context/themeContext";

const getGridType = (type, data, aspectRatio) => {
    switch (type) {
        case listThemes.text:
            return <GridList data={data}/>;
        case listThemes.hovertext:
            return <GridList data={data}/>;
        default:
            return <GridList data={data}/>;
    }
};

const Grid = ({ 
    type,
    data
}) => {


    const { currentTheme } = useThemeContext();

    return getGridType(currentTheme.data.listLayout, data)
};

export default Grid;
