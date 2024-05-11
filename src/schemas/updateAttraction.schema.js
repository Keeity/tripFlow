const yup = require('yup');

exports.updateAttractionSchema = yup.object().shape({
  name: yup
      .string(),
  description: yup
      .string()
      .min(15),
  visitDate: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'A data deve ter formato aaaa-mm-dd.'),
  cep: yup
      .string()
      .matches(/^[0-9]{8}$|^[0-9]{5}-[0-9]{3}$/, 'O CEP deve ter o formato nnnnnnnn ou nnnnn-nnn')
      .transform(value => value.length === 8 ? value.slice(0, 5) + '-' + value.slice(5) : value), 
  address: yup
      .string()
      .min(10, 'Seja mais específico e indique rua, cidade, estado, dentre outros.'),
  addressNumber: yup
      .number('Apenas números são permitidos. Se tiver complemento, insira no campo de complemento')
      .integer(),
  latitude: yup
  .number('Insira apenas números')
  .test('is-valid-latitude', 'Latitude inválida, deve estar entre -90 e 90 e ter pelo menos 2 dígitos após o ponto decimal', (value) => {if (value === undefined) {
      return true; }const decimalPart = ('' + value).split('.')[1];return value >= -90 && value <= 90 && decimalPart && decimalPart.length >= 2;}),
longitude: yup
  .number('Insira apenas números')
  .test('is-valid-latitude', 'Longitude inválida, deve estar entre -90 e 90 e ter pelo menos 2 dígitos após o ponto decimal', (value) => { if (value === undefined) {
      return true;} const decimalPart = ('' + value).split('.')[1];return value >= -90 && value <= 90 && decimalPart && decimalPart.length >= 2; }),  
  attractionCategory: yup
      .string()
      .oneOf(['natural', 'urbana', 'Somente é possível classificar a atração turística como natural ou urbana']),
  adventureLevel: yup
      .string()
      .transform(value => value.charAt(0).toUpperCase() + value.slice(1))
      .oneOf(['Radical', 'Moderado', 'Tranquilo', 'Indique se é um passeio radical, moderado ou tranquilo.']),
  cost: yup
      .string()
      .transform(value => value.charAt(0).toUpperCase() + value.slice(1))
      .oneOf(['Gratuito', 'Barato', 'Mediano', 'Caro', 'Indique se é um passeio gratuito ou, se pago, se é barato, mediano ou caro']),
  rate: yup
      .string()
      .oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Atribua uma avaliação de 1 a 10.']),
  accessibility: yup
      .boolean('indique true se tiver acessibilidade.'),
  selectiveWasteCollection: yup
      .boolean('Indique true se tiver coleta de lixo'),
  
});


