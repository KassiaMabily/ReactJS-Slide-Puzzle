import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE, COUNTER } from "../lib/constants"
import { canSwap, shuffle, swap, isSolved } from "../lib/helpers"

function Board({ imgUrl }: { imgUrl: string }) {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [counter, setCounter] = useState(COUNTER);
    const [isStarted, setIsStarted] = useState(false);

    console.log('is started:', isStarted)

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }

    const swapTiles = (tileIndex: number) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
        const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
        setTiles(swappedTiles)
        }
    }

    const handleTileClick = (index: number) => {
        swapTiles(index)
    }

    const handleShuffleClick = () => {
        shuffleTiles()
    }

    const handleStartClick = () => {
        shuffleTiles()
        setIsStarted(true)
    }

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    };
    const hasWon = isSolved(tiles);

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        const timer = 0;
        if(counter > 0) setInterval(() => setCounter(counter - 1), 1000);

        if(imgUrl && !isStarted && counter <= 0) handleStartClick();
        
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            <ul style={style} className="board">
                {tiles.map((tile, index) => (
                    <Tile
                        key={tile}
                        index={index}
                        imgUrl={imgUrl}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick}
                    />
                ))}
            </ul>
            {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
            {!isStarted ?
                (<button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => handleStartClick()}>Iniciar</button>) :
                (<button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => handleShuffleClick()}>Resetar</button>)}
        </>
    );
}

export default Board;
