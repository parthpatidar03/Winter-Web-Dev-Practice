import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUserByEmail } from '../services/user_service.js';
import { logInfo } from '../utility/file_logger.js';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = addUser({
            name,
            email,
            password: hashedPassword
        });

        // Create Token
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.password) {
             return res.status(400).json({ message: "Invalid credentials (User has no password set)" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        logInfo(`User Login Success: ${user.email} (ID: ${user.id})`);

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export { register, login };
