import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { configureStore } from './store'

const store = configureStore()
// store.subscribe(()=>{
//   console.log(store.getState())
// })
// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		{/* <React.StrictMode> */}
		<App />
		{/* </React.StrictMode>, */}
	</Provider>
)
