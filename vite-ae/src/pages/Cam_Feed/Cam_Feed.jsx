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
                <a className="b1" href="#"><span>Meow</span></a>
              
                <a href="/">
                    <button>Log Out</button>
                </a>

               
            </div>


            <footer className="main-footer footer-wrapper">
                <p className="footer-contacts">
                text
                </p>
                <ul className="footer-social">
                <li>
                    <a className="social-button" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="17" height="15" viewBox="0 0 17 15">
                        <path fill="#FFF" d="M10.95.144c1.685-.496 2.984.27 3.577 1.179.673-.231 1.331-.481 2.011-.708a2.345 2.345 0 0 1-.857 1.768c.685.17 1.304-.491 1.304-.491-.169 1-1.006 1.788-1.563 2.024-.231 6.75-3.175 11.217-10.077 11.082h-.446c-.41 0-4.164-.46-4.898-1.887 2.271.196 3.893-.422 4.693-1.177-.96-.3-2.679-.477-2.979-2.95.349.106.564.228 1.19.119C1.705 8.247.374 7.53.448 5.33c.285.328 1.067.536 1.34.472C1.085 5.561-.182 2.442.894.85c1.818 1.854 3.735 3.606 7.152 3.773C8.254 2.33 9.183.793 10.95.144z"/>
                    </svg>
                    </a>
                </li>
                <li>
                    <a className="social-button" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22">
                        <path fill="#FFF" d="M12 4V0H8a4 4 0 0 0-4 4v4H0v4h4v10h4V12h4V8H8V4h4z"/>
                    </svg>
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
                made by cutiepie
                </p>
            </footer>
           
            
        </div>
    )
}

