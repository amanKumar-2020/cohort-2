import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: config.imagekit.privateKey, // This is the default and can be omitted
  publicKey: config.imagekit.publicKey,
  urlEndpoint: config.imagekit.urlEndpoint,
});

export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName,
    folder: "snitch",
  });

  return result;
}