import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import UserService from '../services/UserService';

class Registration extends React.Component {
    state = {
        uname: '',
        email: '',
        pass: '',
        error: null
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: null });
    }

    validateForm() {
        return true;
    }

    handleRegister = () => {
        if (!this.validateForm()) {
            this.setState({ error: 'Error !!!' });
        } else {
            const newUser = {
                email: this.state.email,
                id: UserService.getUsers().length + 1,
                isAdmin: false,
                name: this.state.uname,
                password: this.state.pass
            };
            UserService.handleRegistration(newUser).then(u => {
                this.props.history.push('/');
            }).catch(e => {
                this.props.history.push('/login');
            })
            this.setState({ error: null });
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="form-wrapper" >
                    <div className="form-container">
                        <h1>REGISTRATION</h1>
                        <div className="container">
                            <div>
                                <label htmlFor="uname"><b>Username</b></label>
                                <input type="text" placeholder="Enter Username" value={this.state.uname} name="uname" onChange={this.handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email"><b>Email</b></label>
                                <input type="text" placeholder="Enter Email" value={this.state.email} name="email" onChange={this.handleInput} />
                            </div>
                            <div>
                                <label htmlFor="pass"><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" value={this.state.pass} name="pass" onChange={this.handleInput} />
                            </div>

                            {this.state.error && <p>{this.state.error}</p>}

                            <button onClick={this.handleRegister}>Register</button>
                            <p>

                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Registration);