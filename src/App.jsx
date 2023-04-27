import React, { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import { authenticateUser } from './actions/auth'
import ChatBox from './components/ChatBox'

function App() {
	const dispatch = useDispatch()
	const {
		auth: { isLoggedIn, user, token },
	} = useSelector((state) => state)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt_decode(token)
			console.log('user decoded', user)
			dispatch(authenticateUser({ user, token }))
		}
	}, [])

	return (
		<Router>
			<div className='app'>
				<Navbar />
				{isLoggedIn && <ChatBox user={user} bearer={token} />}
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/register'
						element={!isLoggedIn ? <Register /> : <Navigate to='/' />}
					/>
					<Route
						path='/settings'
						element={
							<PrivateRoute>
								<Settings />
							</PrivateRoute>
						}
					/>
					<Route
						path='/profile/:userId'
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>

					<Route path='*' element={<NotFound />} />
				</Routes>
				<ToastContainer />
			</div>
		</Router>
	)
}

export default App
