import React from 'react';
import UserService from '../services/UserService.js';
import Header from '../components/Header.jsx';
import { withRouter } from 'react-router-dom';
import TasksPage from './TasksPage.jsx';


class Dashboard extends React.Component {
    state = {
        loggedUser: null
    }

    componentDidMount() {
        const loggedUser = UserService.getCurrentUser();
        if (loggedUser) {
            this.setState({ loggedUser });
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        const { loggedUser } = this.state;
        return (
            <>
                <Header />
                <TasksPage />
            </>
        );
    }
}

export default withRouter(Dashboard);