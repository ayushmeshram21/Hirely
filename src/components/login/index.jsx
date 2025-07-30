import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";

const Login = () => {

    const [allValues,setValues] = useState({
        username : "",
        password : "",
        erroMsg : ""
    });

    const navigate = useNavigate();

    const token = Cookies.get("jwtToken");

    console.log( token );

    useEffect(()=>{
        
       if( token !== undefined ){ // undefined !== undefined
        navigate("/");
       } 

    },[]);

    const onSubmitUserDetails = async(e)=>{

        e.preventDefault();

        const api = "https://apis.ccbp.in/login";

        const userDetails = {
            username: allValues.username,
            password: allValues.password       
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }

        try {

            const response = await fetch( api, options );

            const data = await response.json(); 

            if( response.ok === true ){

                setValues({...allValues,erroMsg : ""});
                
                Cookies.set("jwtToken", data.jwt_token);

                navigate("/");

            }
            else{

               setValues({...allValues,erroMsg : data.error_msg}); 

            }

            
        } catch (error) {
            console.log( error );
        }


    }


  return (
    <div className="login-cont">
      <form className="w-50 p-4 border border-primary" onSubmit={onSubmitUserDetails}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e)=>{ setValues({...allValues,username : e.target.value})}}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your username with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>{ setValues({...allValues,password : e.target.value})}}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <br /> <br /> 
        <h5 className="text-danger">{allValues.erroMsg}</h5>
      </form>
    </div>
  );
};

export default Login;