import express from "express";
import Song from "../models/songModel.js";
import expressAsyncHandler from "express-async-handler";

const songRouter = express.Router();

songRouter.get("/", async (req, res) => {
  const songs = await Song.find();
  // console.log(products);
  res.send(songs);
});

songRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
      // const prodInfo = {nae, slug, image, brand, category, description, price, countInStock};
      console.log(`name = ${req.body.name}`);
      const newSong = new Song({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        imagelarge: req.body.imagelarge,
        artist: req.body.artist,
        audio: req.body.audio,
      });
      console.log(newSong);
  
      const song = await newSong.save();
  
      res.send(song);
    })
  );

  songRouter.get("/slug/:slug", async (req, res) => {
    // console.log(req.params);
    const song = await Song.findOne({ slug: req.params.slug });
    if (song) {
      res.send(song);
    } else {
      res.status(404).send({ message: "Song Not Found" });
    }
  });


export default songRouter;
