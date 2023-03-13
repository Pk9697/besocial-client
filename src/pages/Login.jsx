import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { login, startLogin } from '../actions/auth'
function Login() {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [formFields,setFormFields]=useState({
        email:"",
        password:""
    })
    const dispatch=useDispatch()
    const auth=useSelector(state=>state.auth)
    // console.log(auth)
    function handleChange(e){
        const {name,value} =e.target
        // console.log(name,value)
        setFormFields((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(login(formFields))
        setFormFields(()=>{
            return {
                email:"",
                password:""
            }
        })
    }
    // console.log(formFields)
  return (
    <div className="login">
        <form onSubmit={handleSubmit} className='widget-wrapper mw-700 login-wrapper'>
            <input name='email' value={formFields.email} onChange={handleChange} className='login__input' type="email" placeholder='Email' required/>
            <input name='password' value={formFields.password} onChange={handleChange} className='login__input' type="password" placeholder='Password' required/>
            <button disabled={auth.inProgress} type='submit' className='login__input login__btn'>{auth.inProgress?'LOGGING IN':'LOG IN'}</button>
        </form>
    </div>
  )
}

export default Login