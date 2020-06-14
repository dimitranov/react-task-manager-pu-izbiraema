import React from "react";
import UserService from "../services/UserService.js";
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: "",
        pass: "",
    };

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: null });
    };

    handleLogin = () => {
        const { email, pass } = this.state;
        if (!email && !pass) {
            this.setState({ error: "Fill both inputs please!" });
        } else if (!email) {
            this.setState({ error: "Fill email please!" });
        } else if (!pass) {
            this.setState({ error: "Fill password  please!" });
        } else {
            const user = {
                email: email,
                password: pass,
            };
            UserService.handleLogin(user)
                .then((u) => {
                    this.props.history.push("/");
                })
                .catch((e) => {
                    this.props.history.push("/registration");
                });
        }
    };

    render() {
        return (
            <div className="form-wrapper">
                <div className="form-container">
                    <h1>LOGIN</h1>
                    <div>
                        <label htmlFor="email">
                            <b>Username</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="pass">
                            <b>Password</b>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.pass}
                            name="pass"
                            onChange={this.handleInput}
                        />
                    </div>
                    {this.state.error && <p>{this.state.error}</p>}

                    <button onClick={this.handleLogin}>Login</button>
                    <p>
                        <Link to="/registration">Dont have a regiistration?</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
