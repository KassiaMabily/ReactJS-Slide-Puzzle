import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Blank from "../template/Blank";
import puzzles from "./../puzzles.json";

export default function Game () {
    const history = useHistory();
    const [ puzzle, setPuzzle ] = useState<IPuzzle>();

    const loadGame = () => {
        const queryParams = qs.parse(history.location.search);

        // Pegar um desafio aleaoriamente
        const puzzlesFiltered = puzzles.filter(function(item, pos) {
            return item.category === queryParams.category;
        })
        const randomPuzzleIndex = Math.floor(Math.random() * puzzlesFiltered.length);
        const imgurl = puzzlesFiltered[randomPuzzleIndex];
        
        const newQueries = { ...queryParams, imgurl: imgurl };

        history.push({
            search: qs.stringify(newQueries)
        })

        setPuzzle(puzzlesFiltered[randomPuzzleIndex]);
    };

    useEffect(() => {
        loadGame();
    })

    return (
        <Blank title={puzzle?.category ?? ""} showBackButton>
            { puzzle?.category }
            { puzzle?.imgUrl }
        </Blank>
    )
}