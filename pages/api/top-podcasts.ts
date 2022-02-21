import type { NextApiRequest, NextApiResponse } from "next";
import { getTopTracks } from "../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getTopTracks();
  const { shows } = await response.json();

  if (shows) {
    const tracks = shows.map((track) => ({
      id: track.id,
      publisher: track.publisher,
      songUrl: track.external_urls.spotify,
      title: track.name,
      image: [track.images],
    }));

    return res.status(200).json({ tracks });
  } else {
    return res.status(404).json({ message: "No shows..." });
  }
}
