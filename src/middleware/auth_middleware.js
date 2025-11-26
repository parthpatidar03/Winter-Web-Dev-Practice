import jwt from 'jsonwebtoken';
import {logError} from '../utility/file_logger.js';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(verified);
        next();
    } catch (err) {
        logError(`Authentication Error: ${err.message}`);
        res.status(403).json({ message: "Invalid Token" });

    }
};

export default authenticateToken;
