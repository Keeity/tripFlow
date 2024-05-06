const { sign }  = require ('jsonwebtoken')
const { Op, Sequelize } = require("sequelize"); 
const { secret } = require('../config/database.config');
const User = require('../models/User');
const { compare, hash } = require("bcryptjs")
const {Router} = require('express');
const axios = require('axios')

class UserController {

//usuario - Fazer Login
async login(req,res) {
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

//usuario - cadastro de usuário comum (user)
//falta criar validações YUP, coletar endereço pelo CPF de API...
async register(req,res) {
    try {
        const { name, gender, birthDate, cpf, phone, email, password, cep, address, addressNumber, addressComplement } = req.body;
    
        if (!(name && birthDate && cpf && email && password && cep && address && addressNumber)) {
          return res.status(400).json({ message: 'Faltou indicar um campo obrigatório!' });
        }
    
        if (!(name.length >= 8)) {
          return res.status(400).json({ message: 'O nome completo é obrigatório!' });
        }
    
        if (!(birthDate.match(/\d{4}-\d{2}-\d{2}/gm))) {
          return res.status(400).json({ message: 'A data de nascimento não está no formato correto ("aaaa-mm-dd")!' });
        }
    
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
        console.log('Gender:', req.body.gender)
        const user = await User.create({
          name,
          gender,
          birthDate,
          cpf,
          phone,
          email,
          password,
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

//usuario - alterar o próprio cadastro
async update (req,res) { 
    try {
       const id = req.payload.sub
       const {password, email, cep, address, addressNumber, addressComplement} = req.body
       const user = await User.findByPk(id)
      
    if(!user){
       return res.status(404).json({error: 'Usuário não encontrado.'})
     }
    //  if (password) {
    //     const hashPassword = await hash(password, 8);
    //     user.password = hashPassword;
    //   }

     password && (user.password = password);
     email && (user.email = email);
     cep && (user.cep = cep);
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
async delete(req,res) { 
    try{
      const { id } = req.params;   //ou const id = req.params.id
     const user = await User.findByPk(id);
     if(!user) {
      return res.status(404).json({error:`User ID ${id} não encontrado.`})
       }
     await user.destroy() 
      
      res.status(204).json({message: `User ID ${id} deletado com sucesso!`})
    } catch (error) {
      console.error(`Erro ao tentar excluir: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
    
  }

//usuario - listar todos - admin
async list (req, res) {
    try {
            const user = await User.findAll()
            res.json(user)
        }
    catch (error) {
      console.error(`Erro ao listar usuários: ${error}`)
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }
  
//usuario - listar por id - admin
async listById (req,res) {
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

  
//usuario - filtrar por name, gender, cpf, email, cep ou endereço - admin
async listByFilter (req, res) {
    try {
      let params = {};
      if(req.query.name) {
        params = {...params, name: { [Op.iLike]: '%' + req.query.name + '%' }} 
      }

      if (req.query.gender) {
        params.gender = { [Op.eq]: req.query.gender };
      }
      
      if (req.query.cpf) {
        params.cpf = { [Op.eq]: req.query.cpf };
      }
  
      if (req.query.email) {
        params.email = { [Op.iLike]: `%${req.query.email}%` };
      }
  
      if (req.query.cep) {
        params.cep = { [Op.eq]: req.query.cep };
      }
  
      if (req.query.address) {
        params.address = { [Op.iLike]: `%${req.query.address}%` };
      }

      const users = await User.findAll({ where: params });
  
      if (users.length > 0) {
        console.log(`Listando usuários filtrados pelos parâmetros fornecidos.`);
        return res.status(200).json(users);
      } else {
        console.log(`Nenhum usuário encontrado com os parâmetros fornecidos.`);
        return res.status(404).json({ error: 'Nenhum usuário encontrado' });
      }
    } catch (error) {
      console.error(`Erro ao filtrar usuários: ${error}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
  
  //usuario - alterar qualquer cadastro - admin
async adminUpdate(req,res) { 
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
async adminDelete(req,res) { 
try{
    const { id } = req.params; 
   const user = await User.findByPk(id);
   if(!user) {
    return res.status(404).json({error:`Usuário ID ${id} não encontrado.`})
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
