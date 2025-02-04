import {z} from 'zod';


const sensorDataSchema = z.object({
    timestamp: z.string().datetime(),
    temperature: z.number().min(-50).max(100),
    humidity: z.number().min(0).max(100),
    air_quality: z.number().min(0).max(500),
    dust_density: z.number().min(0),
    device_id: z.string().min(1),
});

const validatedData = async (data) => {
    const result = sensorDataSchema.safeParse(data);
    if (!result.success) {
        const errorMessages = result.error.errors.map((error)=>error.path.join('.') + ' ' + error.message);
        throw new Error(errorMessages.join('; '));  

    }

    return result.data;
}

const sensorDataModel = {validatedData};
export default sensorDataModel;