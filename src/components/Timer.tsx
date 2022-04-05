import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

let countdownTimeout: NodeJS.Timeout;

interface Props {
    totalTime: number;
    currentTime: number;
    isActive: boolean;
    setIsActive: (state: boolean) => void;
    setCurrentTime: (state: number) => void;
    position ?: string;
}

export default function Timer({ totalTime, currentTime, setCurrentTime, isActive, setIsActive, position = "middle"}: Props) {

    useEffect(()=>{ 
        if( isActive && currentTime > 0 ){
            countdownTimeout = setTimeout(() => {
                setCurrentTime(currentTime - 1)
            }, 1000)
        }else if( isActive && currentTime === 0 ){
            setIsActive(false);
        }
    }, [ isActive, currentTime ]);

    if(position === "middle") {
        return (
            <div className="absolute z-30 inset-0 overflow-hidden bg-gray-200 bg-opacity-5 transition-opacity">
                <div className="flex h-full items-center justify-center">
                    <div className="h-32 w-32 text-center flex items-center justify-center">
                        <span className='text-xl sm:text-3xl text-indigo-700'>{currentTime}</span>
                    </div>
                </div>
            </div> 
        )
    }else{
        return(
            <div className="absolute z-0 top-4 right-4 h-24 w-24">
                <CircularProgressbar
                    background={true}
                    backgroundPadding={4}
                    styles={buildStyles({
                        backgroundColor: "rgba(0,0,0,0.7)",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                        textSize: "3rem",
                    })}
                    
                    value={currentTime} 
                    maxValue={totalTime} 
                    text={`${currentTime}`} 
                />
            </div>
        )
    }
    
}