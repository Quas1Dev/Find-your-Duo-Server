import { Router } from "express";
// import { findAllGames, findById, createNewAd, getDiscordById } from "../controllers/AdsController";

import { findAllGames, createNewAd, findById, getDiscordById } from "../controllers/AdsController";

const routes = Router();

routes.get('/games', findAllGames);
routes.post('/games/:id/ads', createNewAd);
routes.get('/games/:id/ads', findById);
routes.get('/ads/:id/discord', getDiscordById);

export default routes;
