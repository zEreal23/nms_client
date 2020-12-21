import React, { useState , useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { Button } from "antd";
import {useSelector} from 'react-redux'

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("zEreal23@hotmail.com");
  const [loading, setLoging] = useState(false);

  const {user} = useSelector((state) => ({...state}))

  useEffect(()=>{
      if(user && user.token){
          history.push("/home");
      }
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoging(true)

    const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };

    await auth
    .sendPasswordResetEmail(email,config)
    .then(()=>{
        setEmail('')
        toast.success("Check your email for password reset Link")
    })
    .catch((error) => {
        setLoging(false)
        toast.error(error.message)
        console.log(error)
    })
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          exmple@hotmail.com
        </small>
        <br />
        <Button
          onClick={handleSubmit}
          block
          shape="round"
          size="large"
          disabled={!email}
        >Submit</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
