import React from 'react';
import UserService from '../services/UserService.js'
import { Link, withRouter } from 'react-router-dom';


class TaskCard extends React.Component {
    render() {
        const { task } = this.props;
        const user = UserService.getUserById(task.user);
        const isAdmin = UserService.getCurrentUser().isAdmin;
        return (
            <div className="card task-card">
                <p>{task.title}</p>
                <p><span>Description: </span>{task.description}</p>
                <p><span>Estimate: </span>{task.estimate}h</p>
                <p><span>Status: </span>{task.status}</p>
                <p><span>Assignee: </span>{user.name}</p>
                {isAdmin && <Link to={`/tasks-edit/${task.id}`}>
                    <button>EDIT</button>
                </Link>
                }
            </div>
        );
    }
}


export default withRouter(TaskCard);