export default async function handler(req, res) {
  // Grab category from the request query, default to 'now_playing'
  const category = req.query.category || 'now_playing';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    }
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch TMDB data' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}