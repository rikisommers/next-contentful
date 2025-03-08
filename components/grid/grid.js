import React from "react";
import GridBento from "./grid-bento";
import GridList from "./grid-list";
import { gridThemes } from "../../utils/theme";

const getGridType = (type, data) => {
    switch (type) {
        case gridThemes.bento1:
            return <GridBento data={data}/>;
        case gridThemes.list:
            return <GridList data={data}/>;
        default:
            return <GridBento data={data}/>;
    }
};

const Grid = ({ 
    type,
    data
}) => {
    return getGridType(type, data);
};

export default Grid;
