import mongoose from "mongoose";

const songSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true, unique: true},
        image: {type: String, required: true},
        artist: {type: String, required: true},
        audio: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)

const Song = mongoose.model('Song', songSchema);
export default Song;