const { Op, Sequelize } = require("sequelize"); 
const Attraction = require('../models/Attraction');
const {Router} = require('express');
const axios = require('axios')
const User = require("../models/User");
const geoCodeService = require("../services/geocode");

class AttractionController {


// //attraction - Cadastrar atração pública 
async register(req,res) {
    try {
        let { name, description, visitDate, cep, addressNumber,attractionCategory, 
                adventureLevel, cost, rate, accessibility, selectiveWasteCollection } = req.body;
        
        const geoCode = await geoCodeService.getGeoCode(cep, name);
        
  if(!geoCode)
 {
  return res.status(400).json({ error: 'Não foi possível obter os dados de localização para o CEP ou localidade fornecida. Tente inserir mais informação' });
 } 

 const { address, latitude, longitude } = geoCode
  const id = req.payload.sub

  const geoLocality = `https://www.google.com/maps/?q=${latitude},${longitude}`;

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
          geoLocality,
          attractionCategory,
          adventureLevel,
          cost,
          rate,
          accessibility,
          selectiveWasteCollection,
          user_id: id,
          visibility: 'public'
        });
    
        res.status(201).json(attraction);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível cadastrar a atração turística' });
      }
    }

// //attraction - listar todas as atrações cadastradas
async list (req, res) {
    try {
            const attraction = await Attraction.findAll()
            res.json(attraction)
        }
    catch (error) {
      console.error(`Erro ao listar atrações turísticas: ${error}`)
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }

// //attraction - listar atrações cadastradas por filtro: name, cep, address, attractionCategory, visibility, adventureLevel, cost, rate, accessibility, selectiveWasteCollection, user_id. 
async listByFilter (req, res) {
    try {
      let params = {};
      if(req.query.name) {
        params = {...params, name: { [Op.iLike]: '%' + req.query.name + '%' }} 
      }

      if (req.query.cep) {
        params.cep = { [Op.iLike]: '%' + req.query.cep + '%' };
      }
      if (req.query.address) {
        params.address = { [Op.iLike]: '%' + req.query.address + '%' };
      }
      if (req.query.attractionCategory) {
        params.attractionCategory = req.query.attractionCategory;
      }
      if (req.query.visibility) {
        params.visibility = req.query.visibility;
      }
      if (req.query.adventureLevel) {
        params.adventureLevel = req.query.adventureLevel;
      }
      if (req.query.cost) {
        params.cost = req.query.cost;
      }
      if (req.query.rate) {
        params.rate = req.query.rate;
      }
      if (req.query.accessibility !== undefined) {
        params.accessibility = req.query.accessibility === 'true';
      }
      if (req.query.selectiveWasteCollection !== undefined) {
        params.selectiveWasteCollection = req.query.selectiveWasteCollection === 'true';
      }
      if (req.query.user_id) {
        params.user_id = req.query.user_id;
      }
  
      const attractions = await Attraction.findAll({ where: params });

      if (attractions.length > 0) {
        console.log(`Listando atrações turísticas pelos parâmetros fornecidos.`);
        return res.status(200).json(attractions);
      } else {
        console.log(`Nenhuma atração encontrada com os parâmetros fornecidos.`);
        return res.status(404).json({ error: 'Nenhuma atração turística encontrada com os parâmetros fornecidos' });
      }
    } catch (error) {
      console.error(`Erro ao filtrar atrações: ${error}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

// //attraction - listar atrações por id
async listById (req,res) {
    try {
      const { id } = req.params
      const attraction = await Attraction.findByPk(id)
      if(!attraction) {
        return res.status(404).json({ message: "Atração Turística não encontrada!"})
      }
    res.status(200).json(attraction)
    
    } catch (error) {
      console.error(`Erro ao buscar atração turística: ${error}`);
      return res.status(500).json({error: 'Erro interno do servidor'});
    }
  }

// attraction - alterar qualquer atração
async update(req,res) { 
    try {
         const id = req.params.id;
        const attraction = await Attraction.findByPk(id)
        if(!attraction){
          return res.status(404).json({error: 'Atração Turística não encontrada.'})
        }
        await attraction.update(req.body)
        //await attraction.save()
        console.log("Alteração realizada com sucesso!")
        res.status(200).json(attraction)
    } catch (error) {
          console.error(`Erro ao tentar alterar: ${error}`);
          return res.status(500).json({error: 'Erro interno do servidor'});
        }
      }

// attraction - excluir qualquer atração
async delete(req,res) { 
    try{
        const { id } = req.params; 
       const attraction = await Attraction.findByPk(id);
      if(!attraction) {
        return res.status(404).json({error:`Atração Turística ID ${id} não encontrada.`})
         }
       await attraction.destroy() 
       res.status(200).json({message: `Atração Turística ID ${id} excluída com sucesso!`})
    } catch (error) {
        console.error(`Erro ao tentar excluir: ${error}`);
        return res.status(500).json({error: 'Erro interno do servidor'});
      }
    }
    

    }

module.exports = new AttractionController()
