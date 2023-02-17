// Types
import { Request, Response } from 'express';

// Utils
import { convertMinutesToHour } from '../utils/convert-minutes-string-to-hour';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import client from '../dbConfig/dbConfig';

// API RESTful API should respect HTTP method's goal and HTTP code's goal

// Returns all games + amount of ads for each of them
async function findAllGames(req: Request, res: Response) {
    client.query("SELECT * FROM games", (err, results) => {
        if (err) throw err;
        return res.json(results.rows);
    });
}

// async function createNewAd(req: Request, res: Response) {
//     const gameId = req.params.id;
//     const body: any = req.body;

//     const ad = await prisma.ad.create({
//         data: {
//             gameId,
//             "name": body.name,
//             "yearsPlaying": body.yearsPlaying,
//             "discord": body.discord,
//             "weekDays": body.weekDays.join(","),
//             "hourStart": convertHourStringToMinutes(body.hourStart),
//             "hourEnd": convertHourStringToMinutes(body.hourEnd),
//             "useVoiceChannel": body.useVoiceChannel
//         }
//     })

//     return res.status(201).json(ad)
// }

// // When the request is for the /ads resource, we return an array of objects 
// async function findById(req: Request, res: Response) {
//     let gameId = req.params.id
//     let ads = await prisma.ad.findMany({
//         select: {
//             id: true,
//             name: true,
//             weekDays: true,
//             useVoiceChannel: true,
//             yearsPlaying: true,
//             hourStart: true,
//             hourEnd: true
//         },
//         where: {
//             gameId
//         }
//     })

//     return res.json(ads.map(ad => (
//         {
//             ...ad,
//             weekDays: ad.weekDays.split(","),
//             hourStart: convertMinutesToHour(ad.hourStart),
//             hourEnd: convertMinutesToHour(ad.hourEnd)
//         }
//     )))

// }

// // Retrieve discord using ad's id
// async function getDiscordById(req: Request, res: Response) {
//     let adId = req.params.id

//     let ad = await prisma.ad.findUniqueOrThrow({
//         select: {
//             discord: true
//         },
//         where: {
//             id: adId
//         }
//     })

//     return res.json(ad)
// }


// export {
//     findAllGames,
//     createNewAd,
//     findById,
//     getDiscordById,
// }

export {
    findAllGames
}