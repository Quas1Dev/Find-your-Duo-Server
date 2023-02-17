import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'fernando',
  password: 'nlw',
  database: 'nlw'
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
    'https://static-cdn.jtvnw.net/ttv-boxart/1494_IGDB-144x192.jpg',
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
  const queryText = `
  INSERT INTO ads (gameId, name, yearsplaing, discord, weekdays, hourstart, hourend, usevoicechannel)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8),
         ($9, $10, $11, $12, $13, $14, $15, $16),
         ($17, $18, $19, $20, $21, $22, $23, $24),
         ($25, $26, $27, $28, $29, $30, $31, $32),
         ($33, $34, $35, $36, $37, $38, $39, $40)
  RETURNING name, yearsplaing, discord, weekdays, hourstart, hourend, usevoicechannel
`;

  const values = [
    'd30d4d91-d6f3-4056-bd11-55708e14a514',
    'Eleementary',
    3,
    'fernando bonfim#1548',
    [0,1],
    "16:00",
    "18:00",
    true,
    '2ff167e4-c14a-4284-8c6e-f681b81ad89e',
    'Genocida',
    3,
    'macaquinho internado#1548',
    [3,4],
    "16:00",
    "18:00",
    true,
    '264b530d-7023-41c0-85f7-fa0bf1ba951a',
    'O Inglês do Mal',
    5,
    'zech muller#1548',
    [0,1],
    "16:00",
    "18:00",
    true,    
    'aa093205-80b1-4d7b-bcd3-5fca50085cce',
    'Sem PC',
    8,
    'zech silva#1548',
    [2,5,6],
    "16:00",
    "18:00",
    false,
    '09a322e4-1326-45cc-9db8-f008582b842d',
    'Destrutivo',
    8,
    'edward el erico#1548',
    [1, 2, 3, 4],
    "16:00",
    "18:00",
    false,
  ];
  const result = await client.query(queryText, values);
  return result
}

runSeeder();