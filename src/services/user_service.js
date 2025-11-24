import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const users = require('../models/users.json');

const getUserByName = (name) => {
    const userData = users.find((u) => u.name.toLowerCase() === name.toLowerCase());
    return userData ? userData : null;
}

const getUserById = (id) => {
    // Convert id to number because URL params are strings
    const userData = users.find((u) => u.id === Number(id));
    return userData ? userData : null;
}

export { getUserByName, getUserById };