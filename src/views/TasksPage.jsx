import React from 'react';
import { withRouter } from 'react-router-dom';
import TaskCard from '../components/TaskCard.jsx';
import TaskService from '../services/TaskService.js';

class TasksPage extends React.Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        const tasks = TaskService.getTasks();
        this.setState({ tasks });
    }

    renderTasks() {
        const { tasks } = this.state;
        if (!tasks || tasks.length === 0) {
            return <p>No tasks yet :/</p>;
        }
        return tasks.map((task) => <TaskCard key={task.id + task.title} task={task} />)
    }

    render() {
        return (
            <div className="task-container">
                <h1>Tasks</h1>
                {this.renderTasks()}
            </div>
        );
    }
}

export default withRouter(TasksPage);