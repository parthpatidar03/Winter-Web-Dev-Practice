import express from "express";
import {  addUser ,getAllUsers , getUserDetailbyApi, saveUser, deleteUser} from '../services/user_service.js';

const getUsers = (req, res) => {
  const users = getAllUsers();
    res.status(200).json(users);
}

const getUserbyapiId = (req, res) => {
    const users = getUserDetailbyApi(req.params.id);
  if (users) {
    res
    .setHeader('X-User-Id', users.id)
    .status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

const addNewUser = (req, res) => {
  const newUser = req.body;
  const addedUser = addUser(newUser);
  res.setHeader('X-User-Id', addedUser.id);
  res.status(201).json(addedUser);
}

const updateUserApi = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const updatedUser = saveUser(id, updatedData);
  if (updatedUser) {
    res.setHeader('X-User-Id', updatedUser.id);
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}
const deleteUserApi = (req, res) => {
  const id = req.params.id;
  const success = deleteUser(id);
  if (success) {
    res.setHeader('X-User-Id', id);
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

export { getUsers , getUserbyapiId, addNewUser, updateUserApi , deleteUserApi };