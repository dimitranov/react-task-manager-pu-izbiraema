import React from 'react';
import UserService from '../services/UserService.js'
import { Link, withRouter } from 'react-router-dom';
import Header from './Header.jsx';
import TaskCard from './TaskCard.jsx';
import TaskService from '../services/TaskService.js';


class UserInspect extends React.Component {
    state = {
        user: null,
        tasks: []
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            const userInfo = UserService.getUserById(id);
            TaskService.getUserTasksById(id).then(tasks => {
                this.setState({ user: userInfo, tasks });
            });
        }
    }

    handleDelete = () => {
        UserService.deleteUser(this.state.user.id).then(response => {
            this.props.history.push('/users');
        });
    }

    render() {
        const { user, tasks } = this.state;

        if (!user || !user.id) {
            return <h1>No user found ! </h1>;
        }

        return (
            <>
                <Header />
                <div>
                    <h1>{user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Status: {user.isAdmin.toString()}</p>
                    <Link to={`/users-edit/${user.id}`}>EDIT</Link>
                    {user.id !== UserService.getCurrentUser().id && <button onClick={this.handleDelete}>DELETE</button>}
                    {
                        tasks && tasks.length > 0 && tasks.map((task) => <TaskCard key={task.id} task={task} />)
                    }
                </div>
            </>
        );
    }
}

export default withRouter(UserInspect);
