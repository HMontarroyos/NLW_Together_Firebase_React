import React from 'react';
import Lottie from 'react-lottie'
import  animationData from '../errorLottie/Errorlottie.json';

export default function ErrorLottie() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={500}
                width={500}
            />
        </div>
    );
}