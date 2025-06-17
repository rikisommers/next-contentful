import React from "react";
import GridBento from "./grid-bento";
import GridList from "./grid-list";
import GridThings from "./grid-things";
import GridBasic from "./grid-basic";
import GridJonas from "./grid-jonas";
import { gridThemes } from "../../utils/theme";
import { useThemeContext } from "../context/themeContext";

const getGridType = (type, data) => {
    switch (type) {
        case gridThemes.bento1:
            return <GridBento data={data}/>;
        case gridThemes.basic:
            return <GridBasic data={data}/>;
        case gridThemes.list:
            return <GridList data={data}/>;
        case gridThemes.things:
            return <GridThings data={data}/>;
        case gridThemes.jonas:
            return <GridJonas data={data}/>;
        default:
            return <GridBento data={data}/>;
    }
};

const Grid = ({ 
    type,
    data
}) => {


    const { currentTheme } = useThemeContext();

    return <>
    {getGridType(currentTheme.data.cardGrid, data)}</>
};

export default Grid;
