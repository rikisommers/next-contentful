import React from "react";
import GridBento from "./grid-bento";
import GridThings from "./grid-things";
import GridBasic from "./grid-basic";
import ListText from "./list-text";
import ListTextHover from "./list-text-hover";
import ListTextImage from "./list-text-image";
import { gridLayoutThemes } from "../../utils/theme";
import { listLayoutThemes } from "../../utils/theme";
import { useThemeContext } from "../context/themeContext";

const Grid = ({ 
    type,
    data
}) => {
    const { currentTheme } = useThemeContext();

    const getGridType = (gridType, postsData) => {
        switch (gridType) {
            case gridLayoutThemes.gridBasic:
                return <GridBasic data={postsData} theme={currentTheme.data.gridPrimary}/>;
            case gridLayoutThemes.gridBento:
                return <GridBento data={postsData}/>;
            case gridLayoutThemes.gridThings:
                return <GridThings data={postsData}/>;
            default:
                return <GridBasic data={postsData}/>;
        }
    };

    const getListType = (listType, postsData) => {
        switch (listType) {
            case listLayoutThemes.textList:
                return <ListText data={postsData}/>;
            case listLayoutThemes.textHoverList:
                return <ListTextHover data={postsData}/>;
            case listLayoutThemes.textImageList:
                return <ListTextImage data={postsData}/>;
            default:
                return <ListText data={postsData}/>;
        }
    };
    
    // Check data.type to determine grid or list layout
    if (data?.type === 'grid') {
        return getGridType(currentTheme?.data?.gridType, data);
    } else if (data?.type === 'list') {
        return getListType(currentTheme?.data?.listType, data);
    } else {
        // Fallback to GridBasic
        return <GridBasic data={data}/>;
    }
};

export default Grid;
