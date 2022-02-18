import { getTopTracks } from "../../lib/spotify";

export default async (_, res) => {
  const response = await getTopTracks();
  const { shows } = await response.json();

  console.log(shows);

  const tracks = shows.slice(0, 10).map((track) => ({
    publisher: track.publisher,
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: [track.images],
  }));

  return res.status(200).json({ tracks });
};
