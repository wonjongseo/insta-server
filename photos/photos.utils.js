import fs from "fs";

export const loadFile = async (file, userId) => {
  if (!file) return null;
  const { filename, createReadStream } = await file;

  const newFilename = `${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = fs.createWriteStream(
    `${process.cwd()}/uploads/${newFilename}`
  );
  readStream.pipe(writeStream);
  return `http://localhost:${process.env.PORT}/static/${newFilename}`;
};

export const extractHashtags = (caption) => {
  let hashtagObj = [];

  if (caption) {
    const hashtags = caption.match(/#[\w]+/g);
    if (hashtags == null) {
      return hashtagObj;
    }
    if (hashtags.length > 0) {
      hashtagObj = hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag },
      }));
    }
  }

  return hashtagObj;
};
