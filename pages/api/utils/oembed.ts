import { NextApiRequest, NextApiResponse } from "next";

const oembedURLs = {
  twitter: "https://publish.twitter.com/oembed",
  instagram: "https://www.instagram.com/api/v1/oembed",
  youtube: "https://www.youtube.com/oembed",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url;
  let type = req.query.type;

  if (Array.isArray(type)) type = type[0];

  const oembedUrl = oembedURLs[type];

  if (!oembedUrl) {
    res.status(404).json({ error: "Not found" });
  }

  const response = await fetch(`${oembedUrl}?url=${url}`);

  if (response.ok) {
    const json = await response.json();
    res.status(200).json(json);
  } else {
    console.error(await response.text());
    res.status(404).json({ error: "Not found" });
  }
}