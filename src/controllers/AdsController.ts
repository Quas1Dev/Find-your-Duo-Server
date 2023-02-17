// Types
import { Request, Response } from 'express';

// Utils
import { convertMinutesToHour } from '../utils/convert-minutes-string-to-hour';
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import client from '../dbConfig/dbConfig';

// API RESTful API should respect HTTP method's goal and HTTP code's goal

// Returns all games + amount of ads for each of them
async function findAllGames(req: Request, res: Response) {
    try {
        const results = await client.query(`SELECT g.id, g.title, g.thumb, COUNT(a.gameId) AS num_ads
                  FROM games g
                  LEFT JOIN ads a ON g.id = a.gameId
                  GROUP BY g.id`);
        return res.status(200).json(results.rows);
    } catch (err: any) {
        return res.status(500).json({
            err: "Couldn't load games data.",
            message: err.message,
        })
    }
}

// Create a new ad for a given game
async function createNewAd(req: Request, res: Response) {
    const gameId = req.params.id;
    const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = req.body;

    const query = `
    INSERT INTO ads ( 
        gameid,
        usevoicechannel,
        yearsplaying,
        weekdays,
        hourstart,
        hourend,
        name,
        discord) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `

    const values = [gameId, useVoiceChannel, yearsPlaying, weekDays, hourStart, hourEnd, name, discord];

    try {
        const result = await client.query(query, values);
        console.log(result);
        return res.status(201).json({
            roucount: result.rowCount
        });

    } catch (err: any) {
        return res.status(500).json({
            err: "Error while adding the new ad.",
            message: err.message,
        })
    }
}

// When the request is for the /ads resource, we return an array of objects 
async function findById(req: Request, res: Response) {
    let gameId = req.params.id

    try {
        const query = `SELECT * FROM ads WHERE gameId = $1`;
        const result = await client.query(query, [gameId]);
        const hoursConvertedResult = result.rows.map(ad => ({
            ...ad,
            hourstart: convertHourStringToMinutes(ad.hourstart),
            hoursnd: convertHourStringToMinutes(ad.hourend),
        }))

        console.log(hoursConvertedResult);
        return res.status(200).json(result);
    } catch (err: any) {
        return res.status(500).json({
            err: "Coudn't run query",
            message: err.message
        })
    }
}

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
    findAllGames,
    createNewAd,
    findById
}