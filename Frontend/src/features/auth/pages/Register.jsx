import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router'      //Link ke upar cleck karne se dusre page mein shift hona hi navigate hona hai
import { useAuth } from '../hooks/useAuth'


const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {      
        e.preventDefault()  
        await handleRegister({ username, email, password })
        navigate('/login')           
    }

    if (loading){
        return (<main><h1>Wait...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>


                <form onSubmit={handleSubmit}>      
                    <div className="input-group">
                        <label htmlFor='email'>Email</label>
                        <input 
                            onChange={(e) => { setEmail(e.target.value) }}
                            type='email' id='email' name='email' placeholder='Enter Your Email'/>
                    </div>
                    <div className="input-group">
                        <label htmlFor='username'>Username</label>
                        <input 
                            onChange={(e) => { setUsername(e.target.value) }}
                            type='username' id='username' name='username' placeholder='Enter Username'/>
                    </div>
                    <div className="input-group">
                        <label htmlFor='password'>Password</label>
                        <input 
                            onChange={(e) => { setPassword(e.target.value) }}
                            type='password' id='password' name='password' placeholder='Enter Your Password'/>
                    </div>

                    <button className='button secondary-button'>Register</button>
                </form>

                <p>Already Have An Account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register