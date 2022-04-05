import React, { useState, useEffect } from "react";
import { Motion, spring } from "react-motion";
import { getMatrixPosition, getVisualPosition } from "../lib/helpers";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE, COUNTER } from "../lib/constants"
import Timer from "./Timer";

function Tile(props: IProps) {
    const { tile, index, width, height, handleTileClick, imgUrl } = props;
    // Carregamento de página
    const [ timeLoading, setTimeLoading ] = useState(COUNTER)
    const [ activeTimeLoading, setActiveTimeLoading ] = useState(false);

    const { row, col } = getMatrixPosition(index);
    const visualPos = getVisualPosition(row, col, width, height);
    const tileStyle = {
        width: `calc(100% / ${GRID_SIZE})`,
        height: `calc(100% / ${GRID_SIZE})`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: `${BOARD_SIZE * 1.25}px`,
        backgroundPosition: `${(100 / GRID_SIZE) * (tile % GRID_SIZE)}% ${(100 / GRID_SIZE) * (Math.floor(tile / GRID_SIZE))}%`,

    };
    const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
    }

    useEffect(() => {
        setTimeLoading(COUNTER)
        setActiveTimeLoading(true);
    }, [])

    return (
        <>
        {
            activeTimeLoading && (
                <Timer 
                    totalTime={COUNTER}
                    currentTime={timeLoading}
                    isActive={activeTimeLoading}
                    setIsActive={setActiveTimeLoading}
                    setCurrentTime={setTimeLoading}
                />
            )
        }
        
        <Motion style={motionStyle}>
            
            {({ translateX, translateY }) => (
                <li
                    style={{
                        ...tileStyle,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                        // Is last tile?
                        opacity: tile === TILE_COUNT - 1 ? 0 : 1,
                    }}
                    className="tile"
                    onClick={() => handleTileClick(index)}
                >
                    {!imgUrl && `${tile + 1}`}
                </li>
            )}
        </Motion>
        </>
    );
}

export default Tile;

type IProps = {
    tile: number;
    index: number;
    width: number;
    height: number;
    handleTileClick: (index: number) => void;
    imgUrl: string;
}
