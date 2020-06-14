import Storage from './StorageService.js';
import TaskService from './TaskService.js';

export default class UserService {
    // users
    static getUsers() {
        return Storage.get('users');
    }

    static setUsers(users) {
        return new Promise(function (resolve, reject) {
            try {
                Storage.delete('users');
                Storage.set('users', users);
                resolve(users);
            } catch (e) {
                new Error(e);
            }
        });
    }


    // auth

    static handleLogin(userData) {
        return new Promise((resolve, reject) => {
            UserService.userExists(userData).then(u => {
                if (u) {
                    UserService.setCurrentUser(u);
                    resolve(u);
                } else {
                    reject(null);
                }
            });
        });
    }

    static handleRegistration(newUser) {
        return new Promise((resolve, reject) => {
            UserService.userExists(newUser).then(u => {
                reject(null);
            }).catch(u => {
                UserService.addUser(newUser);
                UserService.setCurrentUser(newUser);
                resolve(u);
            });
        });
    }

    static handleLogout() {
        return new Promise((resolve, reject) => {
            Storage.delete('currentUser');
            resolve(true);
        });
    }


    // current logged

    static addSeedAdmin() {
        const users = Storage.get('users');
        if (!users || users.length === 0) {
            Storage.set('users', [{
                id: 1,
                name: 'Georgi Dimitranov',
                email: 'georgidimitranov97@gmail.com',
                password: '1',
                isAdmin: true,
            }]);
        }
    }

    static setCurrentUser(user) {
        Storage.set('currentUser', user);
    }

    static getCurrentUser() {
        return Storage.get('currentUser')
    }


    // user

    static addUser(newUser) {
        return new Promise((resolve, reject) => {
            const users = UserService.getUsers();
            const usersCopy = [...users];
            usersCopy.push(newUser);
            UserService.setUsers(usersCopy).then(res => {
                resolve(res);
            });
        });
    }

    static getUserById(id) {
        const users = Storage.get('users');
        return users.find(u => u.id.toString() === id.toString());
    }

    static userExists(userData) {
        return new Promise(function (resolve, reject) {
            // const users = Storage.get('users');
            const users = UserService.getUsers();
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.email === userData.email) {
                    resolve(user);
                    return;
                }
            }
            reject();
        });
    }

    static updateUser(newUserData) {
        return new Promise((resolve, reject) => {
            const users = Storage.get('users');
            const updateIndex = users.findIndex(u => u.id === newUserData.id);
            users[updateIndex] = newUserData;
            UserService.setUsers(users).then(response => {
                resolve(response);
            });
        });
    }

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            const users = Storage.get('users');
            const deleteIndex = users.findIndex(u => u.id === id);
            users.splice(deleteIndex, 1);
            UserService.setUsers(users).then(newUsers => {
                TaskService.deleteUserTasksByUserId(id).then(responce => {
                    resolve(responce);
                });
            });
        });
    }
}