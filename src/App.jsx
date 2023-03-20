import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { authenticateUser } from './actions/auth'
import Settings from './pages/Settings'
function App() {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn } = auth
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt_decode(token)
			dispatch(authenticateUser({ user, token }))
		}
	}, [])

	return (
		<Router>
			<div className='app'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					{/* <Route
						path='/login'
						element={!isLoggedIn ? <Login /> : <Navigate to='/' />}
					/> */}
					<Route path='/login' element={<Login />} />
					<Route
						path='/register'
						element={!isLoggedIn ? <Register /> : <Navigate to='/' />}
					/>
					<Route
						path='/settings'
						element={
							isLoggedIn ? (
								<Settings />
							) : (
								<Navigate to='/login' state={{ data: '/settings' }} />
							)
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
