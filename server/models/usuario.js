const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let misRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
}

let Schema = mongoose.Schema;

// == CREAMOS EL SCHEMA == //
let schemaUSer = new Schema({
    name: {
        type: String,
        required: [true, 'name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'mail required']
    },
    password: {
        type: String,
        required: [true, 'pass required']
    },
    img: {
        type: String,
        required: false
    }, 
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: misRoles 
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// == MODIFY SCHEMA TO DELETE PASS IN JSON == //
schemaUSer.methods.toJSON = function() {
    let u = this;
    let uObject = u.toObject();
    delete uObject.password;

    return uObject;
}

// == INDICAR QUE EMAIL ES UNICO == //
schemaUSer.plugin( uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('User', schemaUSer);
