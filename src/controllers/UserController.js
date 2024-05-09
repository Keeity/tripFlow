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

//usuario - cadastro de usuário comum (user)
//falta coletar endereço pelo CPF de API...
async userRegister(req,res) {
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


//usuario - ver seu próprio cadastro
async viewRegister (req, res) {
  try {
    const id = req.payload.sub
    const user = await User.findByPk(id)
          res.json(user)
      }
  catch (error) {
    console.error(`Erro ao visualizar cadastro: ${error}`)
    return res.status(500).json({error: 'Erro interno do servidor'})
  }
}

//usuario - alterar o próprio cadastro
async userUpdate (req,res) { 
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
    try{
      const id = req.payload.sub
      const user = await User.findByPk(id)
     if(!user) {
      return res.status(404).json({error:`User ID ${id} não encontrado.`})
       }
     await user.destroy() 
      res.status(204).json({message: 'Conta excluída! Mas você pode fazer novo cadastro sempre que quiser :)'})
    
    } catch (error) {
      console.error(`Erro ao tentar excluir: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
      }

 //usuario/reactivate - reativar cadastro
async reactivate (req,res) { 
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


//usuario - listar todos - admin
async usersList (req, res) {
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

// //filtro
//   async listByFilter (req, res) {
//     try {
//       let params = {};

//       if (req.query.id) {
//         params.id = req.query.id;
//       }
//       if(req.query.name) {
//         params = {...params, name: { [Op.iLike]: '%' + req.query.name + '%' }} 
//       }

//       if (req.query.gender) {
//         params.gender = { [Op.iLike]: '%' + req.query.gender + '%' };
//       }
//       if (req.query.address) {
//         params.address = { [Op.iLike]: '%' + req.query.address + '%' };
//       }
//       if (req.query.cpf) {
//         params.cpf = req.query.cpf;
//       }
//       if (req.query.email) {
//         params.email = { [Op.iLike]: '%' + req.query.email + '%' };
//       }
        
//       const users = await User.findAll({ where: params });

//       if (users.length > 0) {
//         console.log(`Listando usuários pelos parâmetros fornecidos.`);
//         return res.status(200).json(users);
//       } else {
//         console.log(`Nenhum usuário encontrado com os parâmetros fornecidos.`);
//         return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
//       }
//     } catch (error) {
//       console.error(`Erro ao filtrar usuários: ${error}`);
//       return res.status(500).json({ error: 'Erro interno do servidor' });
//     }
//   }

//     const findUsers = await User.findAll({ where: params });

//     if (findUsers.length > 0) {
//       console.log('Listando usuários filtrados pelos parâmetros fornecidos.');
//       return res.status(200).json(findUsers);
//     } else {
//       console.log('Nenhum usuário encontrado com os parâmetros fornecidos.');
//       return res.status(404).json({ error: 'Nenhum usuário encontrado' });
//     }
//   } catch (error) {
//     console.error(`Erro ao filtrar usuários: ${error}`);
//     return res.status(500).json({ error: 'Erro interno do servidor' });
//   }

// // usuario - filtrar por name, gender, cpf, email, cep ou endereço - admin
// async listUsersByFilter(req, res) {
//   try {
//     let params = {};
//     if (req.query.name) {
//       params.name = { [Op.iLike]: `%${req.query.name}%` };
//     }

//     if (req.query.gender) {
//       params.gender = { [Op.iLike]: `%${req.query.gender}%` };
//     }
    
//     if (req.query.cpf) {
//       const cpfClean = req.query.cpf.replace(/[.-]/g, '');
//       params.cpf = { [Op.iLike]: `%${cpfClean}%` };
//     }

//     if (req.query.email) {
//       params.email = { [Op.iLike]: `%${req.query.email}%` };
//     }

//     if (req.query.cep) {
//  const cepClean = req.query.cep.replace(/[.-]/g, '');
// params.cep = { [Op.iLike]: `%${cepClean}%` };
//     }

//     if (req.query.address) {
//       params.address = { [Op.iLike]: `%${req.query.address}%` };
//     }

//     const findUsers = await User.findAll({ where: params });

//     if (findUsers.length > 0) {
//       console.log('Listando usuários filtrados pelos parâmetros fornecidos.');
//       return res.status(200).json(findUsers);
//     } else {
//       console.log('Nenhum usuário encontrado com os parâmetros fornecidos.');
//       return res.status(404).json({ error: 'Nenhum usuário encontrado' });
//     }
//   } catch (error) {
//     console.error(`Erro ao filtrar usuários: ${error}`);
//     return res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// }

  
  //usuario - alterar qualquer cadastro - admin
async update(req,res) { 
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
