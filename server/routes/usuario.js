const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/usuario');

const app = express();

// === GET ALL USERS=== //
app.get('/usuario', function (req, res) {

    let since = req.query.since || 0;
    since = Number(since);

    let items = req.query.items || 4;
    items = Number(items)

    User.find({status: true}, 'name email role google status') 
    .skip(since)
    .limit(items)
    .exec((err, users) => {
        if(err){
            return res.status(400).json({
                success: false,
                err
            });
        }

        User.count({ status: true }, (err, count) => {
                res.json({
                success: true,
                users,
                total: count
            });
        }) 
        
    })
});
    
// === POST: CREATE USER === //
app.post('/usuario', (req, res) => {
    let body = req.body;
    
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role:body.role
    });
    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                success: false,
                err
            });
        }
        userDB.password = null;

        res.json({
            success: true,
            user: userDB
        });
    });

});
  
// === PUT: UPDATE USER === //
app.put('/usuario/:id', (req, res) => {    
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if(err){
            return res.status(400).json({
                success: false,
                err
            });
        }      
        res.json({
                ok: true,
                user: userDB
            })
    });       
});
  
// === DELETE: REMOVE USER === //
app.delete('/usuario/:id', (req, res) => {      
    let id = req.params.id;
    // User.findByIdAndRemove(id, (err, userDelete) => { 

    let newstatus = {
        status: false
    }
    User.findByIdAndUpdate(id, newstatus, { new: true }, (err, userDelete) => {

        if(err){
            return res.status(400).json({
                success: false,
                err
            });
        }

        if (!userDelete) {
            return res.status(400).json({
                success: false,
                err: {
                    msg: 'User not found'
                }
            });
        }

        res.json({
            success: true,
            user: userDelete
        })
    });

});

  module.exports = app;