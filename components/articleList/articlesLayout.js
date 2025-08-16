import React from "react";
import GridBento from "./grid-bento";
import GridThings from "./grid-things";
import GridBasic from "./grid-basic";
import ListText from "./list-text";
import ListTextHover from "./list-text-hover";
import { articleListLayoutThemes } from "../../utils/theme";
import { useThemeContext } from "../context/themeContext";

const getGridType = (type, data, aspectRatio) => {
    switch (type) {
        case articleListLayoutThemes.gridPrimary:
            return <GridBasic data={data} theme={currentTheme.data.gridPrimary}/>;
        case articleListLayoutThemes.gridSecondary:
            return <GridBasic data={data} theme={currentTheme.data.gridSecondary}/>;
        case articleListLayoutThemes.gridBento:
            return <GridBento data={data}/>;
        case articleListLayoutThemes.gridThings:
            return <GridThings data={data}/>;
        case articleListLayoutThemes.textHoverList:
            return <ListTextHover data={data}/>;
        case articleListLayoutThemes.textImageList:
            return <ListTextImage data={data}/>;
        case articleListLayoutThemes.textList:
            return <ListText data={data}/>;
        default:
            return <GridBasic data={data}/>;
    }
};

const Grid = ({ 
    type,
    data
}) => {


    const { currentTheme } = useThemeContext();

    return getGridType(type, data)
};

export default Grid;
