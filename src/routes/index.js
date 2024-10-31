import express from 'express';
import characters from './charactersRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Bem vindo a API Hunger Games");   
    })

    app.use(express.json(), characters);
    app.use(cors())
    app.use(bodyParser.json());
};

export default routes;