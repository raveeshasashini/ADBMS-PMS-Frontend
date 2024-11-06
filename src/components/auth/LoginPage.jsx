import React, { useState } from 'react'
import AuthService from '../service/AuthService';


export default function LoginPage() {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const authResponse = await AuthService.loginAuth(email,password);
      localStorage.setItem('user',JSON.stringify(authResponse));
      if(authResponse.role_id === 1){
        window.location.href = '/landing-page';
      }else{
        window.location.href = '/landing-page';
      }
    } catch (error) {
      console.log(error+" error login api")
    }

  }


  return (
    <>
      <div style={{position:"fixed", inset:"0px",width:"350px",height:"300px",margin:"auto"}}>

        <form onSubmit={handleSubmit}>

          {/* <!-- Email input --> */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" 
            id="form2Example1" 
            className="form-control" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}/>
            <label 
            className="form-label" 
            >
              Email address
              </label>
          </div>

          {/* <!-- Password input --> */}
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" id="form2Example2" 
            className="form-control" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <label 
            className="form-label" 
            >
              Password
              </label>
          </div>

          {/* <!-- 2 column grid layout for inline styling --> */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* <!-- Checkbox --> */}
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                <label className="form-check-label" > Remember me </label>
              </div>
            </div>

            <div className="col">
              {/* <!-- Simple link --> */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button  type="submit"  className="btn btn-primary btn-sm " style={{marginRight:"6%",width:"47%"}}>Sign in</button>
          <button  type="button"  className="btn btn-danger btn-sm " style={{width:"47%"}}>Clean</button>
        </form>
      </div>
    </>
    
  )
}
