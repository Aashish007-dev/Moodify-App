import React, { useState } from 'react'
import '../styles/register.scss'
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const {loading, handleRegister} = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        await handleRegister({username, email, password})

        navigate("/");
    }



  return (
    <main className="register-page">
        <div className="form-container">
            <h1>Register</h1>
           <form onSubmit={handleSubmit}>
             <FormGroup value={username} 
             onChange={(e) => setUsername(e.target.value)}
                label="Username" placeholder="Enter username"/>
            <FormGroup 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email" placeholder="Enter email"/>
            <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password" placeholder="Enter password"/>
            <button type='submit' className='button'>Register</button>
           </form>
           <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </main>
  )
}

export default Register