var express = require('express');
var router = express.Router();

(() => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        const LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
})();

const tasks = [
    {id: 1, title: 'Wake up', description : 'I alway get up at 6 o clock', status: 1},
    {id: 2, title: 'Eat breakfast', description : 'I alway eat meat and drink water in the morning', status: 2},
    {id: 3, title: 'Running', description : 'I really want to running in the park', status: 3},
    {id: 4, title: 'Go to sleep', description : 'I something go to bed at 11 pm', status: 4},
];


router.get('/', function (req, res, next) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('node-tasks'));
    if (tasksLocalStorage) {
        res.json(tasksLocalStorage);
    } else {
        localStorage.setItem('node-tasks', JSON.stringify(tasks));
        res.json(tasks);
    }
});

router.get('/:id', function (req, res, next) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('node-tasks'));
    const id = req.params.id;
    if (tasksLocalStorage) {
        const taskIndex = tasksLocalStorage.findIndex(task => task.id == id);
        if (taskIndex !== -1) {
            res.json(tasksLocalStorage[taskIndex]);
        } else {
            res.json(null);
        }
    } else {
        res.json(null);
    }
});


router.post('/add', function (req, res, next) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('node-tasks'));
    const data = req.body;
    if (tasksLocalStorage.length == 0) {
        data.id = 1;
    } else {
        const id = Math.max(...tasksLocalStorage.map(t=> +t.id)) + 1;
        data.id = id;
    }
    tasksLocalStorage.push(data);
    localStorage.setItem('node-tasks', JSON.stringify(tasksLocalStorage));
    res.json(data);
});

router.delete('/delete/:id', function (req, res, next) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('node-tasks'));
    const id = req.params.id;
    if (tasksLocalStorage && tasksLocalStorage.length > 0) {
        const index = tasksLocalStorage.findIndex(task => task.id == id);
        if (index !== -1) {
            tasksLocalStorage.splice(index, 1);
            localStorage.setItem('node-tasks', JSON.stringify(tasksLocalStorage));
        }
    }
    res.json(tasksLocalStorage);
});


router.post('/edit', function (req, res, next) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('node-tasks'));
    const taskUpdate = req.body;
    if (tasksLocalStorage && tasksLocalStorage.length > 0) {
        const task = tasksLocalStorage.find(task => task.id == taskUpdate.id);
        if (task) {
            task.title = taskUpdate.title;
            task.description = taskUpdate.description;
            task.status = taskUpdate.url;
            localStorage.setItem('node-tasks', JSON.stringify(tasksLocalStorage));
        }
    }
    localStorage.setItem('node-tasks', JSON.stringify(tasksLocalStorage));
    res.json(tasksLocalStorage);
});

module.exports = router;
