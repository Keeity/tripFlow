const { Op, Sequelize } = require("sequelize");
const Attraction = require('../models/Attraction');
const { Router } = require('express');
const axios = require('axios');
const User = require("../models/User");
const geoCodeService = require("../services/geocode");

class LocalController {

  // local - cadastro de atração privada
  async register(req, res) {
    /* #swagger.tags = ['* Atrações Turísticas - Locais/ Privadas']
       #swagger.description = 'Cadastrar uma nova atração turística privada.'
        #swagger.parameters['authorization'] = { 
            required: true,
            in: 'header',
           description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
        }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Insira as informações da atração turística. Poderá ser fornecido o CEP ou Localidade para busca da geolocalização',
            required: true,
            schema: {
                $name: "Santo Antônio de Lisboa",
                $description: "Santo Antônio de Lisboa é um bairro e praia de Florianópolis, Santa Catarina, muito conhecido pela gastronomia e pelo pôr do sol, que é um dos mais bonitos da ilha. É um dos bairros mais antigos e repleto de bons restaurantes e da história da imigração açoriana.",
                $visitDate: "2024-05-07",
                cep: "88050-300",
                $attractionCategory: "urbana",
                adventureLevel: "tranquilo",
                cost: "gratuito",
                $rate: "10",
                accessibility: false,
                selectiveWasteCollection: false
            }
       }
       #swagger.responses[201] = { description: 'Atração turística cadastrada com sucesso.' }
       #swagger.responses[400] = { description: 'Não foi possível obter os dados de localização para o CEP ou localidade fornecida.' }
       #swagger.responses[409] = { description: 'Atração Turística já cadastrada.' }
       #swagger.responses[500] = { description: 'Erro interno do servidor.' }
    */
    try {
      const { name, description, visitDate, cep, referencePoint, addressNumber, attractionCategory,
        adventureLevel, cost, rate, accessibility, selectiveWasteCollection } = req.body;

      let geoCode = await geoCodeService.getGeoCode(cep, referencePoint);

      if (!geoCode) {
        return res.status(400).json({ error: 'Não foi possível obter os dados de localização para o CEP ou localidade fornecida. Tente inserir mais informação' });
      }

      const { address, latitude, longitude } = geoCode
      //   if (address) {
      //     address = address.substring(0, 254);
      // }
      const id = req.payload.sub

      const geoLocality = `https://www.google.com/maps/?q=${latitude},${longitude}`;

      const user = await User.findByPk(id)

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
        referencePoint,
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
        visibility: 'private'
      });

      res.status(201).json(attraction);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Não foi possível cadastrar a atração turística privada' });
    }
  }

  // //local - listar todas as atrações privadas criadas pelo usuario
  async list(req, res) {
    /* #swagger.tags = ['* Atrações Turísticas - Locais/ Privadas']
     #swagger.description = 'Listar todas as atrações turísticas privadas criadas pelo usuário.'
    #swagger.parameters['authorization'] = { 
          required: true,
          in: 'header',
         description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
      }
        #swagger.responses[200] = { description: 'Atrações turísticas cadastradas pelo usuário.' }
     #swagger.responses[404] = { description: 'Nenhuma atração turística cadastrada pelo usuário.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */
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

        return res.status(404).json({ error: 'Nenhuma atração turística cadastrada pelo usuário.' })
      }
    } catch (error) {
      console.error(`Erro ao listar atrações: ${error}`)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  //local - listar atração privada por id se criada pelo usuario
  async listById(req, res) {
    /* #swagger.tags = ['* Atrações Turísticas - Locais/ Privadas']
     #swagger.description = 'Filtrar uma atração turística privada pelo ID, se criada pelo usuário.'
      #swagger.parameters['authorization'] = { 
         in: 'header',
         required: true,
          description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
      }
      #swagger.parameters['id'] = {
          in: 'path',
           required: true,
           description: 'Informe o ID da atração turística para visualizá-la. Ex: 4',
          required: true
     }
     #swagger.responses[200] = { description: 'Detalhes da atração turística.' }
     #swagger.responses[404] = { description: 'Atração Turística não cadastrada pelo usuário.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */
    try {
      const { id } = req.params
      const user_id = req.payload.sub
      const attraction = await Attraction.findOne({
        where: {
          id,
          user_id
        }
      });
      if (!attraction) {
        return res.status(404).json({ message: "Atração Turística não cadastrada pelo usuário!" })
      }
      res.status(200).json(attraction)

    } catch (error) {
      console.error(`Erro ao buscar atração turística: ${error}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // //local - alterar a própria atração cadastrada
  async update(req, res) {
    /* #swagger.tags = ['* Atrações Turísticas - Locais/ Privadas']
     #swagger.description = 'Alterar informações da própria atração turística cadastrada pelo usuário.'
      #swagger.parameters['authorization'] = { 
         in: 'header',
          required: true,
          description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
      }
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          description: '/informe o ID da atração turística a ser alterada. Ex: 7',
          required: true
     }
     #swagger.parameters['body'] = {
          in: 'body',
           required: true,
           description: 'Dados para atualização da atração turística.',
          schema: {
                cost: "caro",
          }
     }
     #swagger.responses[200] = { description: 'Alteração realizada com sucesso.' }
     #swagger.responses[404] = { description: 'Atração Turística não encontrada ou não cadastrada pelo usuário.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */
    try {

      const { id } = req.params
      const userId = req.payload.sub
      const { name, description, visitDate, cep, attractionCategory,
        addressNumber, adventureLevel, cost, rate, accessibility,
        selectiveWasteCollection } = req.body
      const attraction = await Attraction.findOne({
        where: {
          id
        }
      });

      if (!attraction) {
        return res.status(404).json({ error: 'Atração Turística não encontrada.' })
      }

      if (!(attraction.user_id === userId)) {
        return res.status(404).json({ error: 'Atração Turística não cadastrada pelo usuário.' })
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
      res.status(200).json({ message: "Alteração realizada com sucesso!" })
    } catch (error) {
      console.error(`Erro ao tentar alterar: ${error}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }


  // //local - excluir a própria atração privada cadastrada
  async delete(req, res) {
    /* #swagger.tags = ['* Atrações Turísticas - Locais/ Privadas']
     #swagger.description = 'Excluir atração turística privada cadastrada pelo próprio usuário.'
      #swagger.parameters['authorization'] = { 
          required: true,
          in: 'header',
         description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
      }
      #swagger.parameters['id'] = {
          in: 'path',
           required: true,
           description: 'Informe o ID da atração turística a ser excluída. Ex: 7',
          required: true
     }
     #swagger.responses[200] = { description: 'Atração turística excluída com sucesso.' }
     #swagger.responses[404] = { description: 'Atração Turística não encontrada ou não cadastrada pelo usuário.' }
     #swagger.responses[500] = { description: 'Erro interno do servidor.' }
  */
    try {
      const { id } = req.params
      const userId = req.payload.sub
      const attraction = await Attraction.findOne({
        where: {
          id
        }
      });

      if (!attraction) {
        return res.status(404).json({ error: 'Atração Turística não encontrada.' })
      }

      if (!(attraction.user_id === userId)) {
        return res.status(404).json({ error: 'Atração Turística não cadastrada pelo usuário.' })
      }

      await attraction.destroy()
      res.status(200).json({ message: `Atração turística ID ${id} excluída com sucesso!` })
    } catch (error) {
      console.error(`Erro ao tentar excluir: ${error}`);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }




}



module.exports = new LocalController()
