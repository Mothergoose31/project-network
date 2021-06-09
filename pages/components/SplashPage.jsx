import splashImage  from "../../images/splash.gif"

import React from 'react'

export default function SplashPage() {
    return (
        <div>
            <img src={splashImage}/>
            <h3>Loading Block Chain Data...</h3>
        </div>
    )
}
