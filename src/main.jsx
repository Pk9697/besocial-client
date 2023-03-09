import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from './store'

const store=configureStore()
store.subscribe(()=>{
  console.log(store.getState())
})
console.log(store.getState()) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
