// ====================================
//          PORT
// ====================================
process.env.PORT = process.env.PORT || 3000; 

// ====================================
//       EVIROMENT APP
// ====================================
process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

// ====================================
//       EVIROMENT DB
// ====================================
let connectDB;

if ( process.env.NODE_ENV === 'dev') {
    connectDB = 'mongodb://localhost:27017/miDB'
} else {
    connectDB = 'mongodb+srv://vincemis:.Mlab610!@midb-p11p5.mongodb.net/test?retryWrites=true&w=majority'
}

// connectDB = 'mongodb+srv://vincemis:.Mlab610!@midb-p11p5.mongodb.net/test?retryWrites=true&w=majority'

process.env.dbURL = connectDB;
 