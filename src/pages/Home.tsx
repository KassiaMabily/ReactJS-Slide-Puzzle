import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Blank from "../template/Blank";
import puzzles from "./../puzzles.json";

import { Translator } from '../components/I18n'
import { useTranslation } from "react-i18next";

export default function Home () {
    const { t, i18n } = useTranslation();
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
        <Blank title={<Translator path={`home.title`} />}>
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
                                    <Translator path={`home.categories.${item}`} />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Blank>
    )
}