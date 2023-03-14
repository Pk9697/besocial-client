import React,{useState} from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Alert(props) {

  return (
    <div className='widget-wrapper mw-700 alert'>
        <div className='flex-row'>
            <p>{props.error}</p>
            <div className='icon' onClick={()=>props.setIsAlertClosed(true)}> 
                <CloseOutlinedIcon/>
            </div>
        </div>
    </div>
  )
}

export default Alert