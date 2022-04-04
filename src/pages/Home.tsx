import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { titleCase } from "../lib/helpers";
import Blank from "../template/Blank";
import puzzles from "./../puzzles.json";

export default function Home () {
    const history = useHistory();
    const [ categories, setCatergories ] = useState<string[]>([]);

    useEffect(() => {
        let arr = puzzles.map( p => p.category);
        arr = arr.filter(function(item, pos) {
            return arr.indexOf(item) === pos;
        })
        setCatergories(arr);
    }, []);

    return (
        <Blank title="Escolha sua categoria">
            <div className="space-y-2 sm:space-y-4">
                <ul className="flex space-x-2 sm:space-x-4">
                    {
                        categories.map((item, index) => (
                            <li key={`categorie-${index}`}>
                                <button 
                                    type="button" 
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => {
                                        history.push({
                                            pathname: '/game/',
                                            search: `?category=${item}`
                                        })
                                    }}
                                >
                                    {titleCase(item)}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Blank>
    )
}