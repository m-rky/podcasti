const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const query = new URLSearchParams([
    ["grant_type", "refresh_token"],
    ["refresh_token", refresh_token],
  ]);
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: query,
  });

  return response.json();
};

const TOP_SHOWS_ID_LIST = [
  "1cpyLfDHP1cNnyOb478qrt",
  "3IM0lmZxpFAY7CwMuv9H4g",
  "2X40qLyoj1wQ2qE5FVpA7x",
  "2isrOkJ401yfYNVDEhtdey",
  "79CkJF3UJTHFV8Dse3Oy0P",
  "5VzFvh1JlEhBMS6ZHZ8CNO",
  "20Gf4IAauFrfj7RBkjcWxh",
  "0v4rPjCZUOUCgHgQhrcCs5",
  "6RVl1JmKwf2Qh7JR2OdYhT",
  "4RRlgGFwhpsOdelb2O1Q6a",
  "7GkT9XuqjpFFdFEgFwOoln",
  "29sSPT3klTiBHgGkQh8Gcp",
  "0Yzd0g8NYmn27k2HFNplv7",
  "6z4NLXyHPga1UmSJsPK7G1",
  "6kAsbP8pxwaU2kPibKTuHE",
  "4P86ZzHf7EOlRG7do9LkKZ",
  "5EqqB52m2bsr4k1Ii7sStc",
  "4tBHDbvre02vPEWMAFmzvB",
  "0NQq9zIRpfK8Ne1QtXhyQY",
  "6z4NLXyHPga1UmSJsPK7G1",
];

const SHOWS_ENDPOINT = `https://api.spotify.com/v1/shows?ids=${TOP_SHOWS_ID_LIST}`;

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(SHOWS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPodcastEpisodes = async (id) => {
  const { access_token } = await getAccessToken();

  const SHOWS_LIST_ENDPOINT = `https://api.spotify.com/v1/shows/${id}/episodes`;

  return fetch(SHOWS_LIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
