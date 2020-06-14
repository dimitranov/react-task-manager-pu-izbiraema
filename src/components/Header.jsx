import React from 'react';
import UserService from '../services/UserService.js'
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
    state = {
        user: null,
    }

    componentDidMount() {
        const loggedUser = UserService.getCurrentUser();
        this.setState({ user: loggedUser });
    }

    handleLogout = () => {
        UserService.handleLogout(this.state.user).then((deleted) => {
            if (deleted) {
                this.props.history.push('/login');
            }
        });
    }

    render() {
        const { user } = this.state;
        return (
            <header>
                <nav>
                    <ul>
                        {user && <li><Link to="/">Home</Link></li>}
                        {!user && <li><Link to="/login">Login</Link></li>}
                        {!user && <li><Link to="/registration">Registration</Link></li>}
                        {user && user.isAdmin && <li><Link to="/users">Users</Link></li>}
                        {user && user.isAdmin && <li><Link to="/users-edit">Add New User</Link></li>}
                        {user && <li><Link to="/tasks-edit">Add New Task</Link></li>}
                        <li><button onClick={this.handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);