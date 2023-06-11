import { useRef, useEffect } from "react";
import "./Cam_Feed.scss"
import * as faceapi from 'face-api.js'
import { Link } from "react-router-dom";

export function Cam_Feed(){
    const videoRef = useRef()
    const canvasRef = useRef()

    // Load from useEffect
    useEffect(()=>{
        startVideo()
        videoRef && loadModels()
    })

    // Webcam
    const startVideo =()=>{
        navigator.mediaDevices.getUserMedia({video:true, audio:false})
        .then((currentStream)=>{
            videoRef.current.srcObject = currentStream
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // Load the models
    const loadModels = ()=>{
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            faceapi.nets.ageGenderNet.loadFromUri("/models")
        ]).then(()=>{
            faceMyDetect()
        })
    }

    const faceMyDetect = ()=>{
        setInterval(async()=>{
            const detections = await faceapi.detectAllFaces(videoRef.current,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
                .withFaceExpressions().withAgeAndGender()

            // Draw Faces on canvas
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            faceapi.matchDimensions(canvasRef.current,{
                width:640,
                height:480
            })
            
            const resized = faceapi.resizeResults(detections,{
                width:640,
                height:480
            })

            faceapi.draw.drawDetections(canvasRef.current,resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current,resized)
            resized.forEach( detection => {
                const box = detection.detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
                drawBox.draw(canvasRef.current, resized)
                console.log(Math.round(detection.age)+", "+detection.gender)
            })
        },1000)  
    }

    return(
        <div className="myapp">
        <h1>Camera Feed</h1>
            <div className="appvideo">
            <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
            </div>
            <canvas ref={canvasRef} width="640" height="480"
            className="appcanvas">
            </canvas>
          
            <div className="wrapper">
                <a className="button button__green" href="#"><span>Output CSV</span></a>
              
                <a className="button button__logout" href="/">
                    <span>Log Out</span>
                </a>

               
            </div>


            <footer className="main-footer footer-wrapper">
                <p className="footer-contacts">
                Bahçeşehir University
                </p>
                <ul className="footer-social">
                <li>
                    <a className="social-button" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                </li>
                <li>
                    <a className="social-button" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFF" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                </li>
                <li>
                    <a className="social-button" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="16" viewBox="0 0 20 16">
                        <path fill="#FFF" d="M17 0H3C1.35 0 0 1.35 0 3v10c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3zM6.027 11.998V4.002L15.014 8l-8.987 3.998z"/>
                    </svg>
                    </a>
                </li>
                </ul>
                <p className="footer-copyright">
                made by Armanç Şedal, Aya Shams, Zahide Sernur Kaya
                </p>
            </footer>
           
            
        </div>
    )
}

