import{ findUserByEmail } from '../services/user_service.js';
import bcrypt from 'bcryptjs';

const renderLogin = (req, res) => {
    res.render('login', { title: 'Login Page' });
}
const loginSSR = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', { title: 'Login Page', error: "All fields are required" });
        }
        const user = findUserByEmail(email);
        if (!user) {
            return res.status(400).render('login', { title: 'Login Page', error: "Invalid credentials" });
        }

        if (!user.password) {
            return res.status(400).render('login', { title: 'Login Page', error: "Invalid credentials (User has no password set)" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('login', { title: 'Login Page', error: "Invalid credentials" });
        }
        // Set session user info
        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect('/home'); // Redirect to home or dashboard after successful login
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Server error" });
    }
};
export { renderLogin , loginSSR };