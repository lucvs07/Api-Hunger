import express from 'express';
import characters from './charactersRoutes.js';

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Bem vindo a API Hunger Games");   
    })

    app.use(express.json(), characters);

};

export default routes;