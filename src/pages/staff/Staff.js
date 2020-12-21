import React, { useState , useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";

const Staff = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
        toast.error('Email is required')
        return;
    }

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to camplete your registration.`
    );

    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const staffForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
        <br/>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{staffForm()}</div>
      </div>
    </div>
  );
};

export default Staff;
