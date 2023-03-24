import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

function Alert(props) {
	const [isAlertClosed, setIsAlertClosed] = useState(false)

	return (
		<>
			{!isAlertClosed ? (
				<div
					className={`widget-wrapper mw-700 alert ${
						props.error ? 'alert--error' : 'alert--success'
					}`}
				>
					<div className='flex-row'>
						<p>{props.msg}</p>
						<div className='icon' onClick={() => setIsAlertClosed(true)}>
							<CloseOutlinedIcon />
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default Alert
