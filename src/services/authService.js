import supabase from "../config/database.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { reverseGeocode } from "../utils/tools.js";
dotenv.config();

const loginAdmin = async (form) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      return { success: false, message: "Invalid Credentials" };
    }
    return { success: true, session: data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (form) => {
  try {
    const { data: isDevice, error } = await supabase
      .from("devices")
      .select("*")
      .eq("id", form.device_id)
      .single();

    if (!isDevice) {
      return { success: false, message: "Device ID tidak ditemukan" };
    }

    if (error) {
      console.error("Database Error:", error);
      return { success: false, message: "Terjadi kesalahan server" };
    }

    const coordinate = form.coordinate
      .split(",")
      .map((item) => parseFloat(item));

    console.log(coordinate)
    const location = await reverseGeocode(coordinate[0], coordinate[1]);

    if (isDevice.location === null) {
      const { error: updateError } = await supabase
        .from("devices")
        .update({ coordinate: form.coordinate, location: location ,updated_at: new Date()})
        .eq("id", form.device_id);

      if (updateError) {
        return { success: false, message: "Update lokasi gagal" };
      }
    }

    const token = jwt.sign(
      { deviceId: form.device_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    return { success: true, message: "Login berhasil", token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const service = { loginAdmin, loginUser };
export default service;
