const { sign }  = require ('jsonwebtoken')
const { Op, Sequelize } = require("sequelize"); 
const { secret } = require('../config/database.config');
const User = require('../models/User');
const { compare, hash } = require("bcryptjs")
const {Router} = require('express');
const axios = require('axios');
const { auth } = require('../middlewares/auth');
const Attraction = require('../models/Attraction');
const { getCep } = require('../services/cep');

class UserController {


async login(req,res) {
  /*
  #swagger.tags = ['Usuário - Login e Cadastro']
   #swagger.operationId = 'login'
  #swagger.description = 'Login e Autenticação do Usuário'
 #swagger.parameters['Login'] = {
            in: 'body',
            description: 'Faça login, com email e senha, para se autenticar e retornar um token JWT.',
           schema: {
                   $email: "rawan@example.com",
                   $password: "Rawan15"
                   }
                      } 
   #swagger.responses[200] = { description: 'Login realizado com sucesso, token gerado.' }
   #swagger.responses[400] = { description: 'Email ou senha não fornecidos.' }
   #swagger.responses[403] = { description: 'Email e/ou senha não conferem.' }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
 try {
      const email = req.body.email;
      const password = req.body.password;
         if (!email) {
            return res.status(400).json({ message: 'O email é obrigatório' })
         }
        if (!password) {
            return res.status(400).json({ message: 'O password é obrigatório' })
        }
        const user = await User.findOne({
            where: {email:email}
        })
        if (!(user.deletedAt === null)) {
        return res.status(400).json({ message: 'O cadastro foi excluído. Mas você pode reativá-lo' })
      }
      if(!user){
            return res.status(404).json({ messagem: 'Nenhum usuário corresponde a email e senha fornecidos!' })
        }
       const hashSenha = await compare(password, user.password)
     
        if(hashSenha === false) {
            return res.status(403).json({mensagem: 'Email e/ou senha não conferem'})
        }
        const payload = {sub: user.id, email: user.email, name: user.name} 
        const token = sign(payload, secret, {expiresIn: "24h"})
        res.status(200).json({token: token})
  
    } catch (error) {
        return res.status(500).json({ error: error, message: 'Algo deu errado!' })
    }
}

async userRegister(req,res) {
    /*
  #swagger.tags = ['Usuário - Login e Cadastro']
   #swagger.operationId = 'cadastro'
  #swagger.description = 'Cadastro de novo Usuário - user'
 #swagger.parameters['Cadastro'] = {
            in: 'body',
            description: 'Insira os dados cadastrais do novo usuário.',
            schema: {
                    $name: "Mariana Hawangledt",
                    $gender: "Feminino",
                    $birthDate: "2015-08-10",
                    $cpf: "15156715121",
                    phone: "(48) 991234567",
                    $email: "mariana@example.com",
                    $password: "Mariana10",
                    $cep: "88036-002",
                    $addressNumber: 321,
                    addressComplement: "apto 105"
            }}   
   #swagger.responses[201] = { description: 'Usuário cadastrado com sucesso.' }
   #swagger.responses[409] = { description: 'Email ou CPF já cadastrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */ 
    try {
        let { name, gender, birthDate, cpf, phone, email, password, cep, address: userAddress, addressNumber, addressComplement } = req.body;
        const userCep = await getCep(cep);
        const { address } = userCep;
        const existingEmail = await User.findOne({
          where: {
            email: email
          }
        });
    
        if (existingEmail) {
          return res.status(409).json({ message: "Email já cadastrado" });
        }
    
        const existingCpf = await User.findOne({
          where: {
            cpf: cpf
          }
        });
    
        if (existingCpf) {
          return res.status(409).json({ message: "CPF já cadastrado" });
        }

        const hashPassword = await hash(password, 8);

        console.log('Gender:', req.body.gender)
        const user = await User.create({
          name,
          gender,
          birthDate,
          cpf,
          phone,
          email,
          password: hashPassword,
          cep,
          address,
          addressNumber,
          addressComplement,
          role: 'user'
        });
    
        res.status(201).json(user);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
      }
    }

//usuario/reactivate - reativar cadastro
async reactivate (req,res) { 
  /*
#swagger.tags = ['Usuário - Login e Cadastro']
#swagger.operationId = 'reativacao'
#swagger.description = 'Reativação de Cadastro de Usuário',
#swagger.parameters['cpf'] = { required: true, type: 'string', example: '055.887.232-52', description: 'Insira o número de cpf do usuário cujo cadastro se pretende reativar'},
 #swagger.responses[200] = { description: 'Cadastro reativado com sucesso!' }
   #swagger.responses[404] = { description: 'Usuário excluído não encontrado.' }
   #swagger.responses[409] = { description: 'Usuário já está ativo.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }

*/ 
 
try {
 const { cpf } = req.query
  const user = await User.findOne({ where: {cpf}, paranoid: false})
  const {phone, password, email, cep, address, addressNumber, addressComplement} = req.body
  const deletedAt = user.deletedAt
if(!user){
  return res.status(404).json({error: 'Não foi encontrado um usuário excluído com esse cpf. Faça seu cadastro ou login'})
}

if (user.deletedAt) {
user.setDataValue('deletedAt', null)
} else {
return res.status(409).json({error:`Usuário está ativo. Faça seu login`})}

 if (password) {
   const hashPassword = await hash(password, 8);
   user.password = hashPassword;
 }

phone && user.setDataValue('phone', phone);
email && user.setDataValue('email', email);
cep && user.setDataValue('cep', cep);
address && user.setDataValue('address', address);
addressNumber && user.setDataValue('addressNumber', addressNumber);
addressComplement && user.setDataValue('addressComplement', addressComplement);

await user.save();
console.log("Cadastro reativado com sucesso!")
res.status(200).json({message: "Cadastro reativado com sucesso!"})


} catch (error) {
  console.error(`Erro ao tentar reativar: ${error}`);
  return res.status(500).json({error: 'Erro interno do servidor'});
}
}

async viewRegister (req, res) {
   /*
  #swagger.tags = ['* Usuário - Acesso ao próprio Cadastro']
   #swagger.operationId = 'Ver próprio cadastro'
  #swagger.description = 'Visualizar o próprio cadastro'
   #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
       #swagger.responses[200] = { description: 'Dados do cadastro do usuário.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
      */ 

  try {
   
    const id = req.payload.sub
    const user = await User.findByPk(id)
          res.status(200).json(user)
      }
  catch (error) {
    console.error(`Erro ao visualizar cadastro: ${error}`)
    return res.status(500).json({error: 'Erro interno do servidor'})
  }
}

//usuario - alterar o próprio cadastro
async userUpdate (req,res) { 
     /*
  #swagger.tags = ['* Usuário - Acesso ao próprio Cadastro']
   #swagger.operationId = 'Alterar próprio cadastro'
  #swagger.description = 'Alterar seus dados cadastrais'
 #swagger.parameters['Altera Cadastro'] = {
            in: 'body',
            description: 'Insira os dados cadastrais que serão alterados.',
            schema: {
                    phone: '(47) 912345634',
            }}   
   #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
      #swagger.responses[200] = { description: 'Alteração realizada com sucesso!' }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
            */ 
    try {
       const id = req.payload.sub
       const user = await User.findByPk(id)
       let {phone, password, email, cep, address, addressNumber, addressComplement} = req.body
      
    if(!user){
       return res.status(404).json({error: 'Usuário não encontrado.'})
     }
     if (password) {
        const hashPassword = await hash(password, 8);
        user.password = hashPassword;
      }
      phone && (user.phone = phone);
     email && (user.email = email);
     cep && (user.cep = cep);
     if (cep && !address) {
      const userCep = await getCep(cep);
     address = userCep.address;    }
     address && (user.address = address);
     addressNumber && (user.addressNumber = addressNumber);
     addressComplement && (user.addressComplement = addressComplement);
    
await user.save();
     console.log("Alteração realizada com sucesso!")
     res.status(200).json({message: "Alteração realizada com sucesso!"})
    
    } catch (error) {
       console.error(`Erro ao tentar alterar: ${error}`);
       return res.status(500).json({error: 'Erro interno do servidor'});
     }
}

//usuario - excluir o próprio cadastro
async userDelete(req,res) { 
     /*
  #swagger.tags = ['* Usuário - Acesso ao próprio Cadastro']
   #swagger.operationId = 'Excluir próprio cadastro'
  #swagger.description = 'Excluir o próprio Cadastro'
   #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }  
       #swagger.responses[204] = { description: 'Conta excluída com sucesso.' }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */ 
    try{
      const id = req.payload.sub
      const user = await User.findByPk(id)
     if(!user) {
      return res.status(404).json({error:`User ID ${id} não encontrado.`})
       }
     await user.destroy() 
     console.log('Conta excluída!')
      res.status(204).json({message: 'Conta excluída! Mas você pode fazer novo cadastro sempre que quiser :)'})
    
    } catch (error) {
      console.error(`Erro ao tentar excluir: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
      }
 
//usuario - listar todos - admin
async usersList (req, res) {
     /*
  #swagger.tags = ['Usuário - Acesso ao administrador']
 #swagger.operationId = 'Listar usuarios'
 #swagger.description = 'Listar todos os usuários - Acesso exclusivo Administrador'
    #swagger.responses[200] = { description: 'Lista de todos os usuários.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.'  }
 */ 

    try {
           const users = await User.findAll()
            res.json(users)
        }
    catch (error) {
      console.error(`Erro ao listar usuários: ${error}`)
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }
  
//usuario - listar por id - admin
async listUsersById (req,res) {
     /*
  #swagger.tags = ['Usuário - Acesso ao administrador']
   #swagger.operationId = 'Filtrar cadastro'
  #swagger.description = 'Filtrar usuário por ID - Acesso exclusivo Administrador'
  #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
    #swagger.parameters['id'] = { description: 'Insira o id do usuário a ser pesquisado.' }
     #swagger.responses[200] = { description: 'Dados do usuário.' }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */ 

    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if(!user) {
        return res.status(404).json({ message: "Usuário não encontrado!"})
      }
    res.status(200).json(user)
    
    } catch (error) {
      console.error(`Erro ao buscar usuário: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
  }

  //usuario - alterar qualquer cadastro - admin
async update(req,res) { 
       /*
  #swagger.tags = ['Usuário - Acesso ao administrador']
   #swagger.operationId = 'Altera cadastro'
  #swagger.description = 'Altera qualquer cadastro, inclusive tipo de usuário - Acesso exclusivo Administrador'
 #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
      #swagger.parameters['id'] = { description: 'Insira o id do usuário para alteração de cadastro.', example: '6' }
 #swagger.parameters['Cadastro'] = {
            in: 'body',
            description: 'Insira os dados cadastrais do usuário.',
            schema: {
                    $name: 'Mariana L. Hawangledt',
            }}   
    #swagger.responses[200] = { description: 'Usuário alterado com sucesso.' }
   #swagger.responses[404] = { description: 'Usuário não encontrado.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
      */ 

try {
     const id = req.params.id;
    const user = await User.findByPk(id)
    if(!user){
      return res.status(404).json({error: 'Usuário não encontrado.'})
    }
    await user.update(req.body, { where: { id}})
    //await user.save()
    console.log("Alteração realizada com sucesso!")
    res.status(200).json(user)
} catch (error) {
      console.error(`Erro ao tentar alterar: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
  }

  
//usuario - excluir qualquer cadastro - admin
async usersDelete(req,res) { 
       /*
  #swagger.tags = ['Usuário - Acesso ao administrador']
  #swagger.operationId = 'Excluir cadastro'
  #swagger.description = 'Excluir qualquer cadastro - Acesso exclusivo Administrador'
 #swagger.parameters['authorization'] = { 
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
      #swagger.parameters['id'] = { description: 'Insira o id do usuário que se pretende excluir.', example: '6' }
  #swagger.responses[200] = { description: 'Usuário excluído com sucesso.' }
   #swagger.responses[404] = { description: 'Usuário não encontrado ou possui atrações cadastradas.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */ 

try{
  const { id } = req.params; 
   const user = await User.findByPk(id);
   const attractions = await Attraction.findAll({
    where: { user_id: id }
  });

   if(!user) {
    return res.status(404).json({error:`Usuário ID ${id} não encontrado.`})
     }

     if(attractions.length > 0) {
      return res.status(404).json({error:`Não foi possível excluir, pois usuário id ${id} possui atrações cadastradas.`})
       }
  
   await user.destroy() 
    res.status(200).json({message: `Usuário ID ${id} excluído com sucesso!`})
} catch (error) {
    console.error(`Erro ao tentar excluir: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
}

}

module.exports = new UserController()
