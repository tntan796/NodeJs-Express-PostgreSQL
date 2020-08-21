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

