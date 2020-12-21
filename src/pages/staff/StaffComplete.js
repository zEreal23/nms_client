import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";

const StaffComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    //console.log(window.location.href)
    //console.log(window.localStorage.getItem("emailForRegistration"))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation
    if (!email || !password) {
      toast.error("Email and Password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password Must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log(result)
      if (result.user.emailVerified) {
        //remove email form localStorage
        window.localStorage.removeItem("emailForRegistration");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const CompleteStaffForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          disabled
        />
        <br />
        <label htmlFor="exampleInputEmail1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-rasied">
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">{CompleteStaffForm()}</div>
      </div>
    </div>
  );
};

export default StaffComplete;
