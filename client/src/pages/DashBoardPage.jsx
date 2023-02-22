import React from 'react'
import Menu from '../components/Menu'
import DashBoard from '../components/DashBoard'

const DashBoardPage = () => {
  return (
    <div id="dash" style={ {display: 'flex'}}>
      <Menu />
      <DashBoard />
    </div>
  )
}

export default DashBoardPage