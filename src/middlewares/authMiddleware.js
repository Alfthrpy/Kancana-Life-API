import jwt from 'jsonwebtoken'
import supabase from './../config/database.js'
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // 1️⃣ Coba verifikasi sebagai token dari Supabase (admin)
    const { data: supabaseUser, error: supabaseError } = await supabase.auth.getUser(token);

    if (!supabaseError && supabaseUser?.user) {
        req.user = supabaseUser.user;
        req.role = "admin"; // Set role sebagai admin
        return next();
    }

    // 2️⃣ Jika bukan token Supabase, coba verifikasi sebagai JWT (user biasa)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.deviceId = decoded.deviceId;
        req.role = "user"; // Set role sebagai user biasa
        return next();
    } catch (jwtError) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default authMiddleware