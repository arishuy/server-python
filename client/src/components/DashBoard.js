import React from 'react'
import "../styles/DashBoard.css"
import FaceDetector from './FaceDetector'


const DashBoard = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="dashboard">
      { token ? 
      <div>
      <h1 className="header_dashboard">Cam: </h1>
      <FaceDetector />
      </div>
      :
      <h1 className="header_dashboard"> Please Login! </h1>
      }
    </div>
  )
}

export default DashBoard