import NodeGeocoder from 'node-geocoder';

function startOfMonth(date) {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start.toISOString().split(".")[0];
}
function today() {
  return new Date().toISOString().split("T")[0];
}


const createCategory = (value, category)=>{
    if(category === 'temperature'){
        if(value < 10){
            return 'Sangat Dingin'
        } else if(value >= 10 && value < 20){
            return 'Dingin'
        } else if(value >= 21 && value < 31){
            return 'Normal'
        } else if(value >= 31 && value < 36){
            return 'Hangat'
        } else if(value >= 36 && value < 40){
            return 'Panas'
        } else if(value >= 40){
            return 'Sangat Panas'
        }
        
    } else if(category === 'humidity'){
        if(value >= 0 && value <31){
            return 'Sangat Kering'
        } else if(value >= 30 && value < 50){
            return 'Kering'
        } else if(value >= 50 && value < 70 ){
            return 'Normal'
        } else if(value >= 70 && value <= 85){
            return 'Lembab'
        } else {
            return 'Sangat Lembab'
        }

    } else if(category === 'air_quality'){
        if(value < 600){
            return 'Aman'
        } else if(value >=600 && value <= 1000){
            return 'Tinggi'
        } else if(value >= 1001 && value <= 1500){
            return 'Tinggi'
        } else if(value >= 1501 && value <= 2000){
            return 'Sangat Tinggi'
        } else {
            return 'Berbahaya'
        }

    } else if(category === 'dust_density'){
        if(value < 16){
            return 'Baik'
        } else if(value >= 16 && value <= 50){
            return 'Sedang'
        } else if(value >= 51 && value <= 100){
            return 'Tidak Sehat'
        } else if(value >= 101 && value <= 150){
            return 'Sangat Tidak Sehat'
        } else {
            return 'Berbahaya'
        }
    }
}

const formatPayload = (data) => {
  const formatted = {
    id: data.id,
    timestamp: data.timestamp,
    temperature: {
      value: data.temperature,
      category: createCategory(data.temperature, 'temperature'),
    },
    air_quality: {
      value: data.air_quality,
      category: createCategory(data.air_quality, 'air_quality'),
    },
    dust_density: {
      value: data.dust_density,
      category: createCategory(data.dust_density, 'dust_density'),
    },
    humidity: {
      value: data.humidity,
      category: createCategory(data.humidity, 'humidity'),
    },
    device_id: data.device_id,
  };

  return formatted;
};


const formatDashboardDevice = (data) => {
    const result = {
        "active_device": data.device_aktif,
        "all_devices": data.total_devices,
        "max_temperature": {
          "value": data.suhu_tertinggi,
          "device_name": data.suhu_device
        },
        "min_air_quality": {
          "value": data.co2_tertinggi,
          "device_name": data.co2_device
        },
        "max_dust_density": {
          "value": data.debu_terbanyak,
          "device_name": data.debu_device
        }
      }

      return result
}

const options = {
    provider: 'openstreetmap', // Bisa pakai 'google', 'mapquest', dll.
  };

const geoCoder = NodeGeocoder(options);

const reverseGeocode = async (lat, lon) => {
    try {
      const res = await geoCoder.reverse({ lat, lon });
      const location = res[0].formattedAddress.split(',').slice(0, -3).join(', ');
      console.log(location);
      return location;
    } catch (err) {
      throw err;
    }
  }

export { startOfMonth, today,formatPayload,formatDashboardDevice,reverseGeocode };
