const axios = require('axios');

exports.getCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;
        if (!data.logradouro) {
            throw new Error('CEP inválido ou não encontrado');
        }
        const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
        return {
            address: fullAddress
        };
    } catch (error) {
        console.error(error);
    }
}