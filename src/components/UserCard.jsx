import React from 'react';
import UserService from '../services/UserService.js'
import { Link, withRouter } from 'react-router-dom';


class UserCard extends React.Component {
    render() {
        const { user, isAdmin, location } = this.props;
        return (
            <div key={user.email} className="card user-card">
                <p className="unstyled-link"><Link to={`${location.pathname}/${user.id}`}><span>{user.name}</span></Link></p>
                <p><span>Email:</span> {user.email}</p>
                {isAdmin && user.isAdmin &&
                    <p className="admin-p">
                        <span>Admin</span>
                    </p>}
                {isAdmin && <Link to={`/users-edit/${user.id}`}><button>Edit</button></Link>}
            </div>
        );
    }
}


export default withRouter(UserCard);