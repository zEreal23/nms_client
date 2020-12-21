import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useDispatch  , useSelector} from "react-redux";
import { Link } from "react-router-dom";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("zEreal23@hotmail.com");
  const [password, setPassword] = useState("1234567");
  const [loading, setLoging] = useState(false);

  const {user} = useSelector((state) => ({...state}))
 
  useEffect(() => {
    if (user && user.token) {
      history.push("/home");
    }
  }, [user]);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoging(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      //console.log(result)
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoging(false);
    }
  };

  const loginForm = () => {
    return (
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
        <label htmlFor="exampleInputEmail1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          Password Must be at least 6 characters long.
        </small>
        <br />
        <Button
          onClick={handleSubmit}
          block
          shape="round"
          icon={<LoginOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login
        </Button>

        <Link to="/forgor/password" className="float-right text-danger">
          Forgot Password
        </Link>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login Page</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
