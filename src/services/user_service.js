import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../models/users.json');

const require = createRequire(import.meta.url);
const users = require('../models/users.json');
// services get user data, process it, and return to controller

const getUserById = (id) => {
    // Convert id to number because URL params are strings
    const userData = users.find((u) => u.id === Number(id));
    return userData ? userData : null;
}

const findUserByEmail = (email) => {
    return users.find(u => u.email === email);
}

const getAllUsers = () => {
    return users;
}

const getUserDetailbyApi = (id) => {
    return getUserById(id);
}

const reindexAndSave = () => {
    users.forEach((user, index) => {
        user.id = index + 1;
    });
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Error writing to users.json:", err);
    }
};

const saveUser = (id, newUserData) => {
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex !== -1) {
        // THIS LINE RIGHT HERE IS THE "PATCH" LOGIC:
        users[userIndex] = { ...users[userIndex], ...newUserData };
        reindexAndSave();
        return users[userIndex];
    }
}

const addUser = (newUserData) => {
    const newUser = { id: 0, ...newUserData }; // ID will be set by reindex
    users.push(newUser);
    reindexAndSave();
    return users[users.length - 1];
};

const deleteUser = (id) => {
    const userIndex = users.findIndex((u) => u.id === Number(id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        reindexAndSave();
        return true;
    }
    return false;
};

export { getUserById, getAllUsers, saveUser, addUser, deleteUser , getUserDetailbyApi, findUserByEmail };