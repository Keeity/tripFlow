const { Op, Sequelize } = require("sequelize"); 
const Attraction = require('../models/Attraction');
const {Router} = require('express');
const axios = require('axios')
const User = require("../models/User");
const geoCodeService = require("../services/geocode");

class AttractionController {


// //attraction - Cadastrar atração pública 
async register(req,res) {
/* #swagger.tags = ['Atrações Turísticas - Gerais']
   #swagger.description = 'Cadastrar uma nova atração turística pública - Apenas Administrador.'
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
        $name: "Trilha da Lagoinha do Leste - saindo de matadeiro",
       $description: "Existem duas trilhas que levam à lagoinha do Leste, sendo a mais longa (cerca de 2h), que sai de matadeiro, a mais bonita. A praia é linda, e a trilha passa por passagens deslumbrantes.",
       $visitDate: "07/05/2024",
       referencePoint: "Trilha da Lagoinha do Leste",
        $attractionCategory: "natural",
        adventureLevel: "radical",
        cost: "gratuito",
        $rate: "10",
        accessibility: false,
        selectiveWasteCollection: false
        }
   }
   #swagger.responses[201] = { description: 'Atração turística cadastrada com sucesso.' }
   #swagger.responses[400] = { description: 'Não foi possível obter os dados de localização para o CEP ou localidade fornecida.' }
   #swagger.responses[409] = { description: 'Atração Turística já cadastrada.' }
   #swagger.responses[500] = { description: 'Não foi possível cadastrar a atração turística.' }
*/

    try {
        let { name, description, visitDate, cep, referencePoint, addressNumber,attractionCategory, 
                adventureLevel, cost, rate, accessibility, selectiveWasteCollection } = req.body;
            
        const geoCode = await geoCodeService.getGeoCode(cep, referencePoint);
        
  if(!geoCode)
 {
  return res.status(400).json({ error: 'Não foi possível obter os dados de localização para o CEP ou referência fornecida. Tente inserir mais informação' });
 } 

 let { address, latitude, longitude } = geoCode
 
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
  /* #swagger.tags = ['Atrações Turísticas - Gerais']
   #swagger.description = 'Visualizar todas as atrações turísticas cadastradas - Usuário Premium e Administrador.'
  #swagger.parameters['authorization'] = { 
        required: true,
        in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
      #swagger.responses[200] = { description: 'Listadas todas as atrações turísticas cadastradas.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
*/
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
  /* 
    #swagger.tags = ['Atrações Turísticas - Gerais']
    #swagger.description = 'Filtrar atrações turísticas gerais cadastradas - Usuário Premium e Administrador.'
*/

  /* 
   #swagger.parameters['authorization'] = { 
       required: true,
       in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }  
*/

/*
    #swagger.parameters['name'] = {
    in: 'query',
    description: 'Insira o nome da atração turística, se quiser utilizar esse filtro. Ex: Mole',
    type: 'string',
    example: 'Model'
  }
  #swagger.parameters['cep'] = {
    in: 'query',
    description: 'CEP da atração turística, se quiser utilizar esse filtro. Ex: 88062-400',
    type: 'string'
  }
  #swagger.parameters['address'] = {
    in: 'query',
    description: 'Endereço da atração turística, se quiser utilizar esse filtro. Ex: Avenida das Rendeiras',
    type: 'string'
  }
  #swagger.parameters['attractionCategory'] = {
    in: 'query',
    description: 'Categoria da atração turística, se quiser utilizar esse filtro. Opções: natural, urbana',
    type: 'string'
  }
  #swagger.parameters['visibility'] = {
    in: 'query',
    description: 'Visibilidade da atração turística, se quiser utilizar esse filtro. Opções: public, private',
    type: 'string'
  }
  #swagger.parameters['adventureLevel'] = {
    in: 'query',
    description: 'Nível de aventura da atração turística, se quiser utilizar esse filtro. Opções: tranquilo, moderado, radical',
    type: 'string'
  }
  #swagger.parameters['cost'] = {
    in: 'query',
    description: 'Insira o custo da atração turística, se quiser utilizar esse filtro. Ex: gratuito, barato, mediano, caro',
    type: 'string'
  }
  #swagger.parameters['rate'] = {
    in: 'query',
    description: 'Insira a classificação da atração turística (de 1 a 10), se quiser utilizar esse filtro.Ex: 10',
    type: 'string'
  }
  #swagger.parameters['accessibility'] = {
    in: 'query',
    description: 'Insira true ou false para acessibilidade da atração turística, se quiser utilizar esse filtro. Opções: true ou false',
    type: 'string'
  }
  #swagger.parameters['selectiveWasteCollection'] = {
    in: 'query',
    description: 'Insira true ou false para coleta seletiva de resíduos da atração turística, se quiser utilizar esse filtro. Opções: true ou false',
    type: 'string'
  }
  #swagger.parameters['user_id'] = {
    in: 'query',
    description: 'Insira o ID do usuário, se quiser utilizar esse filtro. Ex: 2',
    type: 'string'
  }

   #swagger.responses[200] = { description: 'Listadas as atrações turísticas pelos parâmetros fornecidos.' }
   #swagger.responses[404] = { description: 'Nenhuma atração turística encontrada com os parâmetros fornecidos.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
*/
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
        params.attractionCategory = req.query.attractionCategory.toLowerCase();
      }
      if (req.query.visibility) {
        params.visibility = req.query.visibility;
      }
       if (req.query.adventureLevel) {
          params.adventureLevel = req.query.adventureLevel.toLowerCase();
        }
          if (req.query.cost) {
        params.cost = req.query.cost.toLowerCase();
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
/* #swagger.tags = ['Atrações Turísticas - Gerais']
   #swagger.description = 'Encontrar uma atração turística geral pelo ID - Usuário Premium e Administrador.'
   #swagger.parameters['authorization'] = { 
        required: true,
        in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
      description: 'Informe o ID da atração turística. Ex: 3',
        required: true
   }
   #swagger.responses[200] = { description: 'Detalhes da atração turística encontrada.' }
   #swagger.responses[404] = { description: 'Atração Turística não encontrada.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
*/

  
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
  /* #swagger.tags = ['Atrações Turísticas - Gerais']
   #swagger.description = 'Alterar informações de uma atração turística geral - Apenas Administrador.'
    #swagger.parameters['authorization'] = { 
        required: true,
        in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
    #swagger.parameters['id'] = {
        in: 'path',
         required: true,
         description: 'Informe o ID da atração turística a ser alterada. Ex: 1',
        required: true
   }
   #swagger.parameters['body'] = {
        in: 'body',
         required: true,
        description: 'Dados para atualização da atração turística.',
        schema: {
        description: "Uma das praias mais bonitas do leste, excelente para a prática de surf. Quando o vento está noroeste ou oeste, fica uma condição ótima para o esporte. É bastante extensa."
        }
   }
   #swagger.responses[200] = { description: 'Atração turística alterada com sucesso.' }
   #swagger.responses[404] = { description: 'Atração Turística não encontrada.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
*/
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
/* #swagger.tags = ['Atrações Turísticas - Gerais']
   #swagger.description = 'Excluir uma atração turística Geral - Apenas Administrador.'
    #swagger.parameters['authorization'] = { 
        required: true,
        in: 'header',
       description: 'Faça login para executar essa operação e insira o token gerado no campo abaixo:' 
    }
    #swagger.parameters['id'] = {
        in: 'path',
         required: true,
         description: 'Informe o ID da atração turística a ser excluída. Ex: 6',
        required: true
   }
   #swagger.responses[200] = { description: 'Atração Turística excluída com sucesso.' }
   #swagger.responses[404] = { description: 'Atração Turística não encontrada.' }
   #swagger.responses[500] = { description: 'Erro interno do servidor.' }
*/
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
