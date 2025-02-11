import supabase from "../config/database.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

const loginAdmin = async (form) => {
    try {
        const {data,error} = await supabase.auth.signInWithPassword({
            email:form.email,
            password:form.password
        })

        if(error) {
            throw error
        }

        return data
    } catch (error) {
        throw error
    }
}

const loginUser = async (form) =>{
    try {
        const {data:isDevice,error} = await supabase
        .from('devices')
        .select('*')
        .eq('id',form.device_id)
        .single()

        if(!isDevice || error){
            return {success:false,message:"Device ID tidak ditemukan"}
        }

        if(isDevice.location ===null){
            const {error:updateError} = await supabase
            .from('devices')
            .update({location:form.location})
            .eq('id',form.device_id)

            if(updateError){
                throw updateError
            }
        }
        const token = jwt.sign({ deviceId: form.device_id }, process.env.JWT_SECRET, {
            expiresIn: "3d", // Token berlaku 7 hari
        });

        return {success:true,message:"Login berhasil",token}
        
    } catch (error) {
        throw error
    }
}


const service = {loginAdmin,loginUser}
export default service