import axios from "axios";


// const axios = require("axios");
 
const apiKey = "CARSXE_API_KEY";
const vin = "WBAFR7C57CC811956";
let VinInfo;

try {
  const { data } = await axios.get("https://api.carsxe.com/specs", {
    params: {
      key: apiKey,
      vin: vin,
    },
  });
  VinInfo = data;
} catch (e) {
  console.error(e);
}

export { VinInfo };