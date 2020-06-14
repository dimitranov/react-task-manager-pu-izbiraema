import React from "react";
import UserService from "../services/UserService.js";
import Header from "./Header.jsx";
import { withRouter } from "react-router-dom";

class UserEdit extends React.Component {
    state = {
        name: "",
        email: "",
        password: "",
        id: null,
        isAdmin: false,

        operation: "add",
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            const userInfo = UserService.getUserById(id);
            this.setState({
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                id: userInfo.id,
                isAdmin: userInfo.isAdmin,

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

    handleDelete = () => {
        UserService.deleteUser(this.state.user.id).then((response) => {
            this.props.history.push("/users");
        });
    };

    handleSave = () => {
        const newUser = {
            id: this.state.id || UserService.getUsers().length + 1,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin,
        };
        const Operation =
            this.state.operation === "edit" ? "updateUser" : "addUser";
        UserService[Operation](newUser).then((response) => {
            this.props.history.push("/users");
        });
    };

    handleStatusChange = () => {
        this.setState((currentState) => ({
            isAdmin: !currentState.isAdmin,
        }));
    };

    render() {
        const { name, email, password, isAdmin, id } = this.state;
        return (
            <>
                <Header />
                <h1>EDIT</h1>
                <div className="form-wrapper edit-form-wrapper">
                    <div className="form-container edit-form-container">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                name="email"
                                type="text"
                                value={email}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                name="password"
                                type="text"
                                value={password}
                                onChange={this.handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="status">
                                Status:{" "}
                                <input
                                    name="status"
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={this.handleStatusChange}
                                />
                            </label>
                        </div>
                        <button onClick={this.handleSave}>Save</button>
                        <button className="delete-btn" onClick={this.handleDelete}>
                            Delete
            </button>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(UserEdit);
