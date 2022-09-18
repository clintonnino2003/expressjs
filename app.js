const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');

const mysql = require('mysql');


const User = require('./models/users');


const app = express();




const dbURI = 'mongodb+srv://clinton2003:09feb2003@nodetuts.roqrpaj.mongodb.net/users?retryWrites=true&w=majority';

const ret = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>app.listen(8000))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');






// app.listen(5000, () =>(console.log('server listening on port 5000')));


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    // res.setHeader('Content-Type', 'text/html');
    // res.write('Hello');
    // res.end()

    res.render('index');
});


//Insert Post 
app.post('/addpost', (req, res) =>{
    const user = new User(req.body);

    // console.log(req.body);

    user.save()
        .then((ret) =>{
            res.redirect('/')
        })
        .catch((err) => console.log(err));

});

app.get('/admin', (req, res) =>{
    User.find().sort({ createdAt: -1 })
        .then((ret) =>{
            res.render('admin', { title: 'All Users', users: ret })
        })
        .catch((err) => console.log(err))
    
    });


app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    User.findById(id)
        .then((ret) =>{
            res.render('details', { title: 'User Details', user: ret});
        })
        .catch((err) => console.log(err));
})

app.delete('/users/:id', (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(() =>{
            res.json({ redirect: '/admin' })
        })
        .catch((err) => console.log(err));
});

// app.post('/', (req, res) =>{
//     console.log(req.body)
//     // const user = new User(req.body)

//     // user.save()
//     // .then((result) =>{
//     //     res.redirect('/');
//     // })

//     // .catch((err) =>{
//     //     console.log(err);
//     // })
// });

//User routes
// app.get('/form', (req, res) =>{
//     User.find().sort({createdAt: -1})
//     .then((result) =>{
//         res.render('index')
//     })

//     .catch((err) =>{
//         console.log(err);
//     })
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log( `Server running on ${PORT}`));