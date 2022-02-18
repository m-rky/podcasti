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
  console.log(query);
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
  "4rOoJ6Egrf8K2IrywzwOMk",
  "5CjrwNCKAEoswcDnj3fOr3",
  "4NZWQf0wUsaT0tO9unlmra",
  "7bnjJ7Va1nM07Um4Od55dW",
  "2isrOkJ401yfYNVDEhtdey",
  "79CkJF3UJTHFV8Dse3Oy0P",
  "5VzFvh1JlEhBMS6ZHZ8CNO",
  "20Gf4IAauFrfj7RBkjcWxh",
  "0Yzd0g8NYmn27k2HFNplv7",
  "1Zw2DKjelPnuEYpydFlhgN",
  "6kAsbP8pxwaU2kPibKTuHE",
  "5mJq4a7j3fkJ6bJEVZL6zk",
  "4P86ZzHf7EOlRG7do9LkKZ",
  "5EqqB52m2bsr4k1Ii7sStc",
  "4tBHDbvre02vPEWMAFmzvB",
  "615iXBRDJi3MVoO4cC7Fmq",
  "0NQq9zIRpfK8Ne1QtXhyQY",
  "706hylM6zaDW8LrrYxcggQ",
  "5YNYcVmxKGsd8Q73mssWT9",
  "2X40qLyoj1wQ2qE5FVpA7x",
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
