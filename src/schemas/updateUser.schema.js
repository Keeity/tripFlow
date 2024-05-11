const yup = require('yup');

exports.updateUserSchema = yup.object().shape({
  gender: yup
      .string()
      .oneOf(['Feminino', 'Masculino', 'Outro'],'Indique o gênero como sendo feminino, masculino ou, se não se encaixar nesses, escreva outro'),
  birthDate: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, 'A data deve ter formato aaaa-mm-dd.'),
  cpf: yup
      .string()
      .matches(/^[0-9]{11}$|^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'O CPF deve ter o formato nnnnnnnnnnn ou nnn.nnn.nnn-nn')
      .transform((value) => {if (value.length === 11) {return value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);}return value;}), // CPF no formato 000.000.000-00
 phone: yup
      .string()
      .matches(/^\(\d{2}\)\d{9}$|^\(\d{2}\) \d{9}$|^\(\d{2}\)\d{5}-\d{4}$|^\(\d{2}\) \d{5}-\d{4}$/, 'O telefone deve ter o formato (nn)nnnnnnnnn, (nn) nnnnnnnnn, (nn)nnnnn-nnnn ou (nn) nnnnn-nnnn')
      .transform((value, originalValue) => { const digits = originalValue.replace(/[ -]/g, '');if (digits.length === 11) {return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;}return originalValue}), // phone formato (nn) nnnnnnnnn
 email: yup
      .string()
      .email(),
  password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*\d).+$/, 'A senha deve ter pelo menos uma letra Maiúscula e um número'),
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
  addressComplement: yup
      .string()
});

