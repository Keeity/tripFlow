const { Op, Sequelize } = require("sequelize"); 
const Attraction = require('../models/Attraction');
const {Router} = require('express');
const axios = require('axios');
const User = require("../models/User");

class LocalController {

// local - cadastro de atração privada
//falta puxar coordenadas e CEP, falta onferir se ele puxa o payload...
async register(req,res) {

     try {
        const { name, description, visitDate, cep, addressNumber,attractionCategory, 
                adventureLevel, cost, rate, accessibility, selectiveWasteCollection } = req.body;
        
        const { address, latitude, longitude } = req.body //arrumar
        
        const id = req.payload.sub
        const user = await User.findByPk(id)

        if (!(name && description && visitDate && cep && address 
            && latitude && longitude && attractionCategory)) {
          return res.status(400).json({ message: 'Faltou indicar um campo obrigatório!' });
        }
    
        if (!(visitDate.match(/\d{4}-\d{2}-\d{2}/gm))) {
          return res.status(400).json({ message: 'A data de visitação não está no formato correto ("aaaa-mm-dd")!' });
        }
    
        const existingName = await Attraction.findOne({
          where: {
            name: name, 
          }
        });
            if (existingName) {
          return res.status(409).json({ message: "Atração Turística já cadastrada" });
        }
    const attraction = await Attraction.create({
          name,
          description,
          visitDate,
          cep,
          address,
          addressNumber,
          latitude, 
          longitude,
          attractionCategory,
          adventureLevel,
          cost,
          rate,
          accessibility,
          selectiveWasteCollection,
          user_id: id,
          visibility: 'private'
        });
    
        res.status(201).json(attraction);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' });
      }
    }

// //local - listar todas as atrações privadas criadas pelo usuario
async list (req, res) {
    try {
        const userId = req.payload.sub
        const attractions = await Attraction.findAll({
            where: { user_id: userId }
          });
     if (attractions.length > 0) {
            console.log("Listando atrações turísticas cadastradas pelo usuário.");
            return res.status(200).json(attractions);
          } else {
            console.log("Nenhuma atração encontrada para este usuário.");

        return res.status(404).json({error: 'Nenhuma atração turística cadastrada pelo usuário.'})
    }
} catch (error) {
      console.error(`Erro ao listar atrações: ${error}`)
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }

// //local - listar atração privada por id se criada pelo usuario
async listById (req,res) {
    try {
    const { id } = req.params
    const user_id = req.payload.sub
    const attraction = await Attraction.findOne({
            where: { 
                id,
                user_id
          }
        });
      if(!attraction) {
        return res.status(404).json({ message: "Atração Turística não cadastrada pelo usuário!"})
      }
    res.status(200).json(attraction)
    
    } catch (error) {
      console.error(`Erro ao buscar atração turística: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
  }

// //local - alterar a própria atração cadastrada
async update (req,res) { 
    try {
   
        const { id } = req.params
        const userId = req.payload.sub
        const {name, description, visitDate, cep, attractionCategory, 
               addressNumber, adventureLevel, cost, rate, accessibility, 
               selectiveWasteCollection} = req.body
        const attraction = await Attraction.findOne({
                where: { 
                    id  }
            });
     
    if(!attraction){
       return res.status(404).json({error: 'Atração Turística não encontrada.'})
     }

     if(!(attraction.user_id ===userId)) {
      return res.status(404).json({error: 'Atração Turística não cadastrada pelo usuário.'})
     }

       name && (attraction.name = name);
       description && (attraction.description = description);
       visitDate && (attraction.visitDate = visitDate);
       cep && (attraction.cep = cep);
       attractionCategory && (attraction.attractionCategory = attractionCategory);
       addressNumber && (attraction.addressNumber = addressNumber);
       adventureLevel && (attraction.adventureLevel = adventureLevel);
       cost && (attraction.cost = cost);
       rate && (attraction.rate = rate);
       accessibility && (attraction.accessibility = accessibility);
       selectiveWasteCollection && (attraction.selectiveWasteCollection = selectiveWasteCollection);
    
await attraction.save();
     console.log("Alteração realizada com sucesso!")
     res.status(200).json({message: "Alteração realizada com sucesso!"})
     } catch (error) {
       console.error(`Erro ao tentar alterar: ${error}`);
       return res.status(500).json({error: 'Erro interno do servidor'});
     }
}


// //local - excluir a própria atração privada cadastrada
async delete(req,res) { 
try{
    const { id } = req.params
    const userId = req.payload.sub
    const attraction = await Attraction.findOne({
            where: { 
                id
          }
        });

        if(!attraction){
          return res.status(404).json({error: 'Atração Turística não encontrada.'})
        }
   
        if(!(attraction.user_id ===userId)) {
         return res.status(404).json({error: 'Atração Turística não cadastrada pelo usuário.'})
        }

    await attraction.destroy() 
    res.status(200).json({message: `Atração turística ID ${id} excluída com sucesso!`})
} catch (error) {
    console.error(`Erro ao tentar excluir: ${error}`);
    return res.status(500).json({error: 'Erro interno do servidor'});
  }
}




}



module.exports = new LocalController()
