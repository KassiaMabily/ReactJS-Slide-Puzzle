import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Board from '../components/Boards';
import { updateURLParameter } from '../lib/helpers';
import useQuery from '../lib/hooks/useQuery';
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
        const puzz = puzzlesFiltered[randomPuzzleIndex];
        
        // const newQueries = { ...queryParams, imgurl: puzz.imgUrl };
        // history.push({
        //     search: qs.stringify(newQueries)
        // })

        window.history.replaceState("", "", updateURLParameter(window.location.href, "img", puzz.imgUrl))

        setPuzzle(puzzlesFiltered[randomPuzzleIndex]);
    };

    useEffect(() => {
        loadGame();
    })

    if(!puzzle) return <span>Carregando</span>

    return (
        <Blank title={puzzle.title} showBackButton>
            <p className='text-sm'>{puzzle.description}</p>
            <div className='flex flex-col items-center space-y-2 sm:space-y-4'>
                <Board imgUrl={puzzle.imgUrl} />
            </div>
        </Blank>
    )
}