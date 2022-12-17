import React,{useState,useEffect} from 'react';
import { images } from '../../constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




const refresh = () =>{  
  window.location.reload(false)
}


const Login = () => {
    const history = useNavigate();
    const [queryMessage, setQueryMessage] = useState('');
    const [telNo, setTelNo] = useState('')
    const [pass, setPass] = useState('')
    const [authenticated, setAuthenticated] = useState(false);


    const Logout =() =>{
      localStorage.removeItem('agent');
      localStorage.removeItem('token');
      refresh();
    }
    

    
    const resumer = () =>{
      const token = JSON.parse(localStorage.getItem('token'));
      const agent = JSON.parse(localStorage.getItem('agent'));
      if(!agent && !token){
        console.log('Good to see you today, please login to begin')
      }else if(!token){
        console.log('No token found please log in')
      }else{
        console.log(agent);
        console.log(token);

        const options = {
          params:{
            msg: 'clear'
          },

          headers:{
            'x-auth-token':token
          }
        }
        axios.get('https://erims-api.onrender.com/api/auth/verify-token',options)
        .then((res)=>{
          const message = res.data
          console.log(res)
          if(!message){
            console.log('logged you out token expired');
            Logout()
            swal("Please Log In", "Your prvious session expired", "error");
          }else if(message === 'token is not valid'){
            Logout()
            swal("Please Log In", "Your prvious session expired", "error");
            console.log('your token has expired try logging in again')
          }else if(message === 'Copy, still valid champ'){
            console.log('Welcome back, please head on to your dashboard')
            swal(`${agent.name} `, "Already Logged In: Welcome Back", "success");
            history.push("/dashboard")
          }else{
            Logout()
            swal("Please Log In", "Your prvious session expired", "error");
            console.log('dunnoe wats wrong but just login again to fix it aiit')
          }
        })
        
      }
    } 


    const login = (e) =>{
      e.preventDefault();
      console.log(`${telNo},${pass}`)

      const data = {
        tel_no:telNo,
        password:pass
      }

        axios.post('https://erims-api.onrender.com:5000/api/auth', data)
        .then((res) => {

          const loggedUser = res.data
          const {token, user,message,auth}  = loggedUser
          const {id,name,phone,userlevel,last_seen} = user

        const agent = {
          id:id,
          name:name,
          phone:phone,
          level:userlevel,
          see:last_seen
        }  

          
          if(auth == true){
            setAuthenticated(true)
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('agent', JSON.stringify(agent))
      
            const checker = localStorage.getItem('agent')
            console.log(checker)

            history.push("/dashboard");
            window.location.reload(false)
          } 

          else{
              setQueryMessage(message)
          }

        })
    }


 
    useEffect(() => {
      resumer()
    }, []);






    return (
        <div className="container">
            <div className="row justify-content-center align-middle py-5">
                <div className="col-md-4 my-5">
                    <div className="card card-signup z-depth-1 p-2">
                        <div className="card-body text-center">
                        <img src={images.logo5} className="logo img-fluid"/>
                        
                      <div className="mb-3">
                        <input type="tel" value={telNo} placeholder="Number" className="myInput form-control spacer" 
                        onChange={e => setTelNo(e.target.value)} required/>
                      </div>

                      <div className="mb-3">
                        <input type="password"  value={pass} className="myInput form-control spacer" placeholder="Password"
                           onChange={e => setPass(e.target.value)} required/>
                      </div>
                     
                      <div className="card-foter d-grid gap-2">
                        <button type="submit" className="btn btn-classic btn-sm my-4" onClick={login}>Login</button>
                      </div>
                        </div>
                        <h5 className="centered text">{queryMessage}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
