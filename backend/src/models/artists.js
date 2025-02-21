import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;

//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     image: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     banner: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     genres: [{
//         type: String,
//         trim: true
//     }],
//     monthlyListeners: {
//         type: Number,
//         default: 0
//     },
//     verified: {
//         type: Boolean,
//         default: false
//     },
//     biography: {
//         type: String,
//         trim: true
//     },
//     socialLinks: {
//         spotify: String,
//         instagram: String,
//         twitter: String
//     },
//     songs: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Song'
//     }]
// }, {
//     timestamps: true,
//     collection: 'artists'
// });

// const Artist = mongoose.model('Artist', artistSchema);

// export default Artist;