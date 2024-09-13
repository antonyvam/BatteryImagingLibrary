import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

const VideoPlayer = ({fname, active}: {fname: string, active: boolean}) => {
    const path = `../assets/videos/${fname}.mp4`
    const vidRef = useRef<HTMLVideoElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);

    const timeUpdate = () => {
        const slider = sliderRef.current!
        const vid = vidRef.current!
        slider.value = vid.currentTime.toString()
        slider.max = vid.duration.toString()
    }

    const sliderChange = () => {
        const slider = sliderRef.current!
        const vid = vidRef.current!
        vid.pause()
        vid.currentTime = parseFloat(slider.value)
    }

    useEffect(() => {
        if (active) {
            vidRef.current?.play()
        } else {
            vidRef.current?.pause()
        }
    }, [active])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20}}>
            <video ref={vidRef} width="300" height="300" loop onTimeUpdate={e => timeUpdate()} >
                <source src={path} type="video/mp4"></source>
            </video>
            <Form.Range style={{width: '70%', marginTop: -24, zIndex: 10}} step={0.1} ref={sliderRef} onChange={e => sliderChange()} />
        </div>
    )
}

export default VideoPlayer