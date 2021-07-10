import React from 'react';
import Lottie from 'react-lottie'
import  animationData from './conversation-lottie-animation.json';

export default function ConversationAnimation() {
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
                height={220}
                width={220}
            />
        </div>
    );
}