import React, { useState } from 'react'



function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({ name: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    return (
        <div className='loginform'>
            <form onSubmit={submitHandler}>
                <div className='form-inner'>
                    <h2>Prisijungti</h2>
                    {(error != "") ? (<div className='error'>{error}</div>) : ""}
                    <div className='form-group'>
                        <label htmlFor='name'>Vartotojo vardas:</label>
                        <input type='text' name='name' id='name' onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name}></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Slaptažodis:</label>
                        <input type="password" name='password' id='password' onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}></input>
                    </div>
                    <input type="submit" value="LOGIN" className='submit' />
                </div>
            </form>
        </div>
    )
}
export default LoginForm