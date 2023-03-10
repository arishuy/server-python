import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FaceDetector = () => {
  const WIDTH = 500;
  const HEIGHT = 500;
  const webcamRef = useRef(null);
  const canvas = useRef();
  const [bboxes, setBboxes] = useState([]);
  const [ctx, setCtx] = useState();
  const [loading, setLoading] = useState(true); 
  const videoConstraints = {
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    setCtx(canvasEle.getContext("2d"));
    setLoading(false);
  }, []);

  useEffect(() => {
    let id = setInterval(async () => {
      let imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        let image = dataURLtoFile(imageSrc, "image");
        let formData = new FormData();
        formData.set("image", image);
        let data = await axios.post("http://localhost:5000/face_detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.data.bboxes) {
          setBboxes(data.data.bboxes);
        } else {
          setBboxes([]);
        }
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (loading) return;
    ctx.clearRect(0, 0, 1000, 1000);
    bboxes.forEach((bbox) => {
      const r1Info = { x: bbox[0], y: bbox[1], w: bbox[2], h: bbox[3] };
      const r1Style = { borderColor: "green", borderWidth: 5 };
      drawRect(r1Info, r1Style);
    });
  }, [bboxes]);

  const drawRect = (info, style = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  return (
    <div className="face-detector">
      <canvas
        ref={canvas}
        ></canvas>
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
    );
    };
export default FaceDetector;