import supabase from "../config/database.js";
import SSEInstance from "../utils/sseInstance.js";
import { formatPayload } from "../utils/tools.js";

const getSensorDataByDevice = async (device_id) => {
  try {
    console.log("device id", device_id);
    const { data, error } = await supabase
      .from("data_sensors")
      .select("*")
      .eq("device_id", device_id);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};

const getSensorDataByDeviceAndFilter = async (device_id, filter) => {
  try {
    console.log(`[FILTER: ${filter}] Querying data for device ${device_id}`);

    const todayISO = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).toISOString();
    const firstDayNextMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      1
    ).toISOString();

    let query = supabase
      .from("data_sensors")
      .select("*")
      .eq("device_id", device_id);

    if (filter === "today") {
      query = query
        .gte("timestamp", `${todayISO}T00:00:00.000Z`)
        .lte("timestamp", `${todayISO}T23:59:59.999Z`);
    } else if (filter === "month") {
      query = query
        .gte("timestamp", firstDayOfMonth)
        .lt("timestamp", firstDayNextMonth);
    }

    const { data, error } = await query;

    if (error) {
      console.error(
        `Error fetching data for device ${device_id} with filter ${filter}:`,
        error
      );
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};

const addNewDataSensors = async (newData) => {
  try {
    const { data, error } = await supabase.from("data_sensors").insert(newData);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error adding new data:", error);
    throw error;
  }
};

const streamDataSensors = async () => {
  const { data, error } = await supabase
    .from("data_sensors")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(1);
  
  const result = formatPayload(data[0])

  SSEInstance.sendData(result)

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "data_sensors" },
      (payload) => {
        console.log("Change received!", formatPayload(payload.new));
        SSEInstance.sendData(formatPayload(payload.new));
      }
    )
    .subscribe();

  console.log("listening for supabase realtime change");
};

const services = {
  getSensorDataByDevice,
  getSensorDataByDeviceAndFilter,
  addNewDataSensors,
  streamDataSensors,
};

export default services;
