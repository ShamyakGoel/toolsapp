const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {type:String,required:true},
    note: {type:String,required:true},
    userAssociated: {type:String,required:true}
}, {timestamps:true});
export default mongoose.models.Note || mongoose.model('Note', NoteSchema)