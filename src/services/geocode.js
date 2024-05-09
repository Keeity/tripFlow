const axios = require('axios');

exports.getGeoCode = async (cep, name) => {
    try {
        let query = cep ? `postalcode=${cep}` : `q=${name.toLowerCase()}`;
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?${query}&format=json`);
      if (response.data && response.data[0]) {
        return {
          address: response.data[0].display_name,
          latitude: response.data[0].lat,
          longitude: response.data[0].lon
        };
      }
    } catch (error) {
      console.error(error);
    }
}