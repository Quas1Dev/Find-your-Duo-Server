import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: process.env.PGPASSWORD,
  database: 'findyourduo'
});

// This function inserts some data into a games table
export async function runSeeder(): Promise<void> {
  try {
    await client.connect();

    await seedGames();
    await seedAds();
    console.log('Seeder completed successfully!');

  } catch (err: any) {
    console.error('Error in seeder:', err);

  } finally {
    await client.end();
  }
}

async function seedGames() {
  const queryText = `
  INSERT INTO games (title, thumb)
  VALUES ($1, $2),
         ($3, $4),
         ($5, $6),
         ($7, $8),
         ($9, $10) 
  ON CONFLICT (title, thumb) DO NOTHING 
  RETURNING id, title, thumb
`;

  const values = [
    'Call of Duty',
    'https://static-cdn.jtvnw.net/ttv-boxart/1494_IGDB-188x250.jpg',
    'Grand Theft Auto',
    'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-188x250.jpg',
    'League of Legends',
    'https://static-cdn.jtvnw.net/ttv-boxart/21779-188x250.jpg',
    'Valorant',
    'https://static-cdn.jtvnw.net/ttv-boxart/516575-188x250.jpg',
    'Counter-Striker: Global Offensive',
    'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-188x250.jpg'
  ];

  const result = await client.query(queryText, values);
  console.log(result.rows);
  return result
}

async function seedAds() {
  const selectResult = await client.query(`SELECT g.id FROM games g`);
  const ids = selectResult.rows;

  const queryText = `
  INSERT INTO ads (gameId, name, yearsplaying, discord, weekdays, hourstart, hourend, usevoicechannel)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8),
         ($9, $10, $11, $12, $13, $14, $15, $16),
         ($17, $18, $19, $20, $21, $22, $23, $24),
         ($25, $26, $27, $28, $29, $30, $31, $32),
         ($33, $34, $35, $36, $37, $38, $39, $40),
         ($41, $42, $43, $44, $45, $46, $47, $48)
  RETURNING name, yearsplaying, discord, weekdays, hourstart, hourend, usevoicechannel
`;
  

  const values = [
    ids[0].id,
    'Eleementary',
    3,
    'fernando bonfim#1548',
    [0,1],
    "16:00:00",
    "18:00:00",
    true,
    ids[0].id,
    'Genocida',
    3,
    'macaquinho internado#1548',
    [3,4],
    "16:00:00",
    "18:00:00",
    true,
    ids[1].id,
    'O Inglês do Mal',
    5,
    'zech muller#1548',
    [0,1],
    "16:00:00",
    "18:00:00",
    true,    
    ids[2].id,
    'Sem PC',
    8,
    'zech silva#1548',
    [2,5,6],
    "16:00:00",
    "18:00:00",
    false,
    ids[3].id,
    'Destrutivo',
    8,
    'edward el erico#1548',
    [1, 2, 3, 4],
    "16:00:00",
    "18:00:00",
    false,
    ids[4].id,
    'Jimbo',
    8,
    'jhegson miru#1548',
    [0,1],
    "16:50:00",
    "18:00:00",
    true,
  ];
  const result = await client.query(queryText, values);
  return result
}

runSeeder();