const yup = require('yup');

exports.attractionSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().min(15).required(),
  visitDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/).required(),
  cep: yup.string().matches(/^[0-9]{5}-[0-9]{3}$/).required(), 
  address: yup.string().min(10).required(),
  addressNumber: yup.number().integer(),
  latitude: yup.number().required().transform((value, originalValue) => parseFloat(originalValue).toFixed(7)),
  longitude: yup.number().required().transform((value, originalValue) => parseFloat(originalValue).toFixed(7)),
  attractionCategory: yup.string().oneOf(['natural', 'urbana']).required(),
  visibility: yup.string().oneOf(['private', 'public']).required(),
  adventureLevel: yup.string().oneOf(['Radical', 'Moderado', 'Tranquilo']),
  cost: yup.string().oneOf(['Gratuito', 'Barato', 'Mediano', 'Caro']),
  rate: yup.string().oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']).required(),
  accessibility: yup.boolean(),
  selectiveWasteCollection: yup.boolean(),
  user_id: yup.number().integer().required(),

});


