import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({ children }) {
	const auth = useSelector((state) => state.auth)
	const location = useLocation()
	console.log(location)
	const { isLoggedIn } = auth
	return isLoggedIn ? (
		<>{children}</>
	) : (
		<Navigate to='/login' state={{ data: location.pathname }} />
	)
}

export default PrivateRoute
