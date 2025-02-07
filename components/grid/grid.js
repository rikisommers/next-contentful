import React from "react";
import GridBento from "./grid-bento";
import GridList from "./grid-list";

const GridStyle = {
    BENTO: "bento",
    LIST: "list",
};

const getGridType = (type, data) => {
    switch (type[0]) {
        case GridStyle.BENTO:
            return <GridBento data={data}/>;
        case GridStyle.LIST:
            return <GridList data={data}/>;
        default:
            return <GridBento data={data}/>;
    }
};

const Grid = ({ 
    type,
    data
}) => {

    return (getGridType(type, data))
    
};

export default Grid;
