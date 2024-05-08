const yup = require('yup');

exports.userSchema = yup.object().shape({
  name: yup.string().min(8).required(),
  gender: yup.string().oneOf(['Feminino', 'Masculino', 'Outro']),
  birthDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).required(),
  cpf: yup.string().matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/).required(), // CPF no formato 000.000.000-00
  phone: yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/),
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*[A-Z])(?=.*\d).+$/).required(),
  cep: yup.string().matches(/^[0-9]{5}-[0-9]{3}$/).required(), 
  address: yup.string().min(10).required(),
  addressNumber: yup.number().integer(),
  addressComplement: yup.string(),
});
