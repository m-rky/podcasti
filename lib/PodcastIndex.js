import { createHash } from "crypto";

const date = Math.floor(Date.now() / 1000);
const sha = createHash("sha1");
const combo = process.env.PODCAST_KEY + process.env.PODCAST_SECRET + date;
sha.update(combo);
const hash = sha.digest("hex");

const options = {
  method: "GET",
  headers: {
    "User-Agent": "Podcasty/1.0",
    "X-Auth-Key": process.env.PODCAST_KEY,
    "X-Auth-Date": date,
    Authorization: hash,
  },
};
const base = `https://api.podcastindex.org/api/1.0`;

export const getEpisodes = async (id) => {
  // TODO: handle more than just 1000 items depending on podcast
  const res = await fetch(
    `${base}/episodes/byfeedid?id=${id}&max=1000`,
    options
  );
  return await res.json();
};
export const search = async (query) => {
  const res = await fetch(`${base}/search/byterm?q=${query}`, options);
  return await res.json();
};
export const getTitle = async (id) => {
  const res = await fetch(
    `${base}/podcasts/byfeedid?id=${id}&max=1&pretty`,
    options
  );
  return await res.json();
};
export const getMultiple = async (id) => {
  const res = await fetch(
    `${base}/episodes/byfeedid?id=${id}&max=3&pretty`,
    options
  );
  return await res.json();
};
export const getDescription = async (id) => {
  const res = await fetch(`${base}/episodes/byid/${id}&fulltext`, options);
  return await res.json();
}