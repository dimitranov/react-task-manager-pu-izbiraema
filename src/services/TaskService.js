import Storage from './StorageService.js';

export default class TaskService {
    static getTasks() {
        return Storage.get('tasks');
    }

    static setTasks(tasks) {
        return new Promise(function (resolve, reject) {
            try {
                Storage.delete('tasks');
                Storage.set('tasks', tasks);
                resolve(tasks);
            } catch (e) {
                new Error(e);
            }
        });
    }

    static addSeedTask() {
        const tasks = Storage.get('tasks');
        if (!tasks || tasks.length === 0) {
            Storage.set('tasks', [{
                id: 1,
                title: 'Task1',
                description: 'Lorem ispidma jhjs hudfghapoqwuj hashgh ',
                estimate: 5,
                status: 'open', // in-proggress, done,
                user: 1
            }]);
        }
    }

    static getTaskById(id) {
        const tasks = Storage.get('tasks');
        return tasks.find(t => t.id.toString() === id.toString());
    }

    static deleteTask(id) {
        return new Promise((resolve, reject) => {
            const tasks = Storage.get('tasks');
            const deleteIndex = tasks.findIndex(u => u.id.toString() === id.toString());
            tasks.splice(deleteIndex, 1);
            TaskService.setTasks(tasks).then(newTasks => {
                resolve(newTasks);
            });
        });
    }

    static addTask(newTask) {
        return new Promise((resolve, reject) => {
            const tasks = TaskService.getTasks();
            tasks.push(newTask);
            TaskService.setTasks(tasks).then(res => {
                resolve(res);
            });
        });
    }

    static updateTask(newTaskData) {
        return new Promise((resolve, reject) => {
            const tasks = Storage.get('tasks');
            const updateIndex = tasks.findIndex(u => u.id.toString() === newTaskData.id.toString());
            tasks[updateIndex] = newTaskData;
            TaskService.setTasks(tasks).then(response => {
                resolve(response);
            });
        });
    }

    static deleteUserTasksByUserId(userId) {
        return new Promise((resolve, reject) => {
            let tasks = Storage.get('tasks');
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                if (task.user == userId) {
                    tasks[i] = null
                }
            }

            tasks = tasks.filter(t => t);

            TaskService.setTasks(tasks).then(newTasks => {
                resolve(newTasks);
            });
        });
    }

    static getUserTasksById(userId) {
        return new Promise((resolve, reject) => {
            let tasks = Storage.get('tasks');
            tasks = tasks.filter(t => t.user == userId);
            resolve(tasks);
        });
    }
}