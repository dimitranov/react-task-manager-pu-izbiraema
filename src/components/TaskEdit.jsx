import React from "react";
import UserService from "../services/UserService.js";
import Header from "./Header.jsx";
import { withRouter } from "react-router-dom";
import TaskService from "../services/TaskService.js";

class TaskEdit extends React.Component {
    state = {
        title: "",
        description: "",
        estimate: "",
        status: "",
        user: false,
        id: null,

        operation: "add",
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            const userInfo = TaskService.getTaskById(id);
            this.setState({
                title: userInfo.title,
                description: userInfo.description,
                estimate: userInfo.estimate,
                status: userInfo.status,
                user: userInfo.user,
                id: userInfo.id,

                operation: "edit",
            });
        } else {
            this.setState({
                operation: "add",
            });
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleStatusChange = (e) => {
        this.setState({ status: e.target.value });
    };

    handleAssignessChange = (e) => {
        this.setState({ user: e.target.value });
    };

    handleDelete = () => {
        TaskService.deleteTask(this.state.id).then((response) => {
            this.props.history.push("/");
        });
    };

    handleSave = () => {
        const newTask = {
            id: this.state.id || TaskService.getTasks().length + 1 + this.state.title,
            title: this.state.title,
            description: this.state.description,
            estimate: this.state.estimate,
            status: this.state.status,
            user: this.state.user,
        };
        const Operation =
            this.state.operation === "edit" ? "updateTask" : "addTask";
        TaskService[Operation](newTask).then((response) => {
            this.props.history.push("/");
        });
    };

    render() {
        const { title, description, estimate, status, user, id } = this.state;
        return (
            <>
                <Header />
                <h1>EDIT</h1>
                <div className="form-wrapper edit-form-wrapper">
                    <div className="form-container edit-form-container">
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                name="title"
                                type="text"
                                value={title}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input
                                name="description"
                                type="text"
                                value={description}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="estimate">Estimate:</label>
                            <input
                                name="estimate"
                                type="number"
                                value={estimate}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div className="input-inline">
                            <label htmlFor="status">Status:</label>
                            <select value={status} onChange={this.handleStatusChange}>
                                <option value="open">open</option>
                                <option value="in-progress">in progress</option>
                                <option value="done">done</option>
                            </select>
                        </div>

                        <div className="input-inline">
                            <label htmlFor="user">Assigness:</label>
                            <select value={user} onChange={this.handleAssignessChange}>
                                {UserService.getUsers().map((user) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <button onClick={this.handleSave}>Save</button>
                            <button className="delete-btn" onClick={this.handleDelete}>
                                Delete
              </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(TaskEdit);
