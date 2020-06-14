import React from 'react';
import UserService from '../services/UserService.js';
import Header from '../components/Header.jsx';
import { Link, withRouter } from 'react-router-dom';
import UserCard from '../components/UserCard.jsx';

class UsersPage extends React.Component {
    state = {
        isAdmin: false,
        users: []
    }

    componentDidMount() {
        const loggedUser = UserService.getCurrentUser();
        const users = UserService.getUsers();
        this.setState({ isAdmin: loggedUser.isAdmin, users });
    }

    renderUsers() {
        const { isAdmin, users } = this.state;
        return users.length > 0 &&
            users.map((user) => <UserCard key={user.email} user={user} isAdmin={isAdmin} />)

    }

    render() {
        const { isAdmin } = this.state;
        return (
            <div>
                <Header />
                <h1>Users</h1>
                <div className="users-container">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

export default withRouter(UsersPage);