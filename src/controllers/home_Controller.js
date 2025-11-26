import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from 'module';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const index = async (req, res) => {
  console.log("Home route accessed");
  await res.send("Hello World!");
};

const about = async (req, res) => {
  console.log("About route accessed");
  res.render("about", { title: "About MEEEE" });
};

const home = async (req, res) => {
  res.render("home", { title: "Home Page" });
};

const contact = async (req, res) => {
  res.render("contact", { title: "Contact Page" });
};

const home1 = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "root.html"));
};


export { index, about, home, contact, home1 };
