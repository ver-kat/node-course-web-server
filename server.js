const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((request, response, next)=>{
    var now = new Date().toString();
    var printString = `${now}: ${request.method} ${request.url}`;
    console.log(printString);
    fs.appendFile('server.log', printString + '\n', (err) => {
        if(err){
            console.log('Unable to write to server.log')
        }
    });
    next();
});
// app.use((request, response)=>{
//     response.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeMessage: 'Maintenance and such'
//     });
// });
app.use(express.static(__dirname + "/public"));
hbs.registerHelper('getCurrentYear', ()=>{
    //return 'test';
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: "Vern",
    //     likes: [
    //         "Reality TV",
    //         "cats"
    //     ]
    // });
    
    res.render('welcome.hbs', {
        pageTitle: 'Welcome to My NodeJS Project Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'I am learning NodeJS and making a website while I do it. Not much to see here, all the work is on the back end!'
    });
});

app.get('/about', (req, res)=>{
    //res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'My NodeJS Project About Page',
        //currentYear: new Date().getFullYear(),
        //welcomeMessage: 'Welcome and such'
    });
});

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'My NodeJS Projects Page'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: "BAD"
    });
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});