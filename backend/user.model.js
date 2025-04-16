import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,

});

export default model('User', userSchema);

