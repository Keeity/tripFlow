const axios = require('axios');

exports.getGeoCode = async (cep, referencePoint) => {
    try {
        let query = cep ? `postalcode=${cep}` : `q=${referencePoint.toLowerCase()}`;
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?${query}&format=json`);
      if (response.data && response.data[0]) {
        let address = response.data[0].display_name;
       
        address = address.length > 254 ? address.substring(0, 254) : address; // Limita o endereço a 254 caracteres

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