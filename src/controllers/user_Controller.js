import express from "express";
import path from "path"; 
import { fileURLToPath } from "url";
import { getUserById , getAllUsers , saveUser , addUser, deleteUser} from "../services/user_service.js";

import e from "express";


// const require = createRequire(import.meta.url);
// const users = require('../models/users.json');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const showAllUsers = async (req, res) => {
  const users = getAllUsers();
  res.render("users/users_list", { title: "Users List", users });
}

const showEachUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).render("not_found", { title: "User not found" });
  }
  res.render("users/user_data", { title: "User Detail", user: user });
}

const editUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    return res.status(404).render("not_found", { title: "User not found" });
  }
  res.render("users/user_edit", { title: "Edit User Page", user: user });
}
const updateUser = (req, res) => {
  const user = saveUser(req.params.id, req.body);
  if (!user) {
    return res.status(404).render("not_found", { title: "User not found" });
  }
  res.render("users/user_data", { title: "Updated User Page", user: user });
}

const showAddUserForm = (req, res) => {
  res.render("users/add_new_user", { title: "Add New User" });
}

const addNewUser = (req, res) => {
  const user = addUser(req.body);
  res.redirect("/users"); // use redirect to show updated list of users, not rendering directly here because it goes through the showAllUsers controller 
}

const deleteUserById = (req, res) => {
  const success = deleteUser(req.params.id);
  if (success) {
    res.redirect("/users");
  } else {
    res.status(404).send("User not found");
  }
}

export {showAllUsers, showEachUser, editUser, updateUser, addNewUser, showAddUserForm, deleteUserById };