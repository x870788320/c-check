import React, { memo, useEffect, useState } from "react";

import { recordTime, formatNum } from '@/common/utils'


let count = 0
let currentTimeShow = '00:00:00'

const TimeComponent = props => {
    let Timer = new recordTime()
    const [ currentTime, setCurrentTime ] =  useState(currentTimeShow);

    const startCountTime = () => {
        count++
        let second = count % 60
        let minute = parseInt(count / 60) % 60
        let hour = parseInt(count / 60 / 60)
        currentTimeShow = [ hour, minute, second ].map(formatNum).join(':')
        setCurrentTime(currentTimeShow)
    }
    
    useEffect(() => {
        Timer.start(startCountTime)
        return ()=>{
            Timer.end()
            count = 0
            currentTimeShow = '00:00:00'
          }
    }, []);

    return (
        <div>{ currentTime }</div>
    )
}

export default memo(TimeComponent)