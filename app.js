// To-do list web application using node, express, ejs with user authentication
const express = require('express');
// creates an express application object
const app = express();
app.set('view engine', 'ejs');
// Mongoose is an object documenting library
const mongoose = require('mongoose');
const Task = require('./models/task');

// Connection stream to MONGODB
const dbURI = 'mongodb+srv://saikarthikvm:tDgSO9HGdTlenLCE@todolist.qkohekn.mongodb.net/'
mongoose.connect(dbURI).then((result) => app.listen(3000));
// app.listen(3000, () => {console.log("Listening");});
app.use(express.static('public')); // using styles.css
app.use(express.urlencoded({extended: true})); // FOR THE POST REQUEST, IT TAKES THE URL DATA AND PARSES INTO OBJ WE WANT

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ganoworc345@gmail.com',
    pass: 'nktf uxvc qsvl ayrc'
  }
});

app.get('/add-tasks', (req, res) => {
    const task = new Task({
        task: "Test ",
        date: "4/5/2024",
        description: "Test for History"
    })
    task.save().then(result => res.send(result)).catch(err => console.log(err));
})
// GET Request for getting the Home page
app.get('/', (req, res) => {
    //res.render("home");
    res.redirect('/tasks');
})
app.get('/tasks', (req, res) => 
{
  Task.find().then(tasks => {
      // Render tasks to the home view
      res.render('home', { tasks: tasks });
      // Filter and collect easy tasks
      let tasksToEmail = "";
      tasks.forEach(task => {
          const date = new Date(task.date); // get the start date

          if (task.options === "easy") {
              const daysToAdd = 2;
              const newDate = new Date(date);
              newDate.setDate(date.getDate() + daysToAdd); // day to next study

              const oneDay = 24 * 60 * 60 * 1000;
              const diffDays = Math.round((newDate - date) / oneDay);

              console.log(diffDays);

              if (diffDays === 2) {
                  tasksToEmail += task.task + " " + "Status: " + task.options + "\n";
                  console.log(tasksToEmail);
              }
          }

          if (task.options === "medium") {
              const daysToAdd = 2;
              const seconddaysToAdd = 5;
              
              const newDate1 = new Date(date);
              newDate1.setDate(date.getDate() + daysToAdd); // day to next study
              
              const newDate2 = new Date(date);
              newDate2.setDate(date.getDate() + seconddaysToAdd); // day to next study

              const oneDay = 24 * 60 * 60 * 1000;
              const diffDays1 = Math.round((newDate1 - date) / oneDay);
              const diffDays2 = Math.round((newDate2 - date) / oneDay);
              console.log(diffDays1);
              console.log(diffDays2);
              if (diffDays1 === 2 || diffDays2 === 5) {
                  tasksToEmail += task.task + " " + "Status: " + task.options + "\n";
                  console.log(tasksToEmail);
              }
          }

          if (task.options === "hard") {
              const daysToAdd = 2;
              const seconddaysToAdd = 5;
              const thirddaysToAdd = 9;
              
              const newDate1 = new Date(date);
              newDate1.setDate(date.getDate() + daysToAdd); // day to next study

              const newDate2 = new Date(date);
              newDate2.setDate(date.getDate() + seconddaysToAdd); // day to next study

              const newDate3 = new Date(date);
              newDate3.setDate(date.getDate() + thirddaysToAdd); // day to next study

              const oneDay = 24 * 60 * 60 * 1000;
              const diffDays1 = Math.round((newDate1 - date) / oneDay);
              const diffDays2 = Math.round((newDate2 - date) / oneDay);
              const diffDays3 = Math.round((newDate3 - date) / oneDay);
              console.log(diffDays1);
              console.log(diffDays2);
              console.log(diffDays3);
              if (diffDays1 === 2 || diffDays2 === 5 || diffDays3 === 9) {
                  tasksToEmail += task.task + " " + "Status: " + task.options + "\n";
                  console.log(tasksToEmail);
              }
          }
      });

      if (tasksToEmail !== "") {
          var mailOptions = {
              from: 'ganoworoc345@gmail.com',
              to: 'ganoworc345@gmail.com',
              subject: "Things to Study Today...",
              text: tasksToEmail
          };

          transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
          });
      }
  }).catch(err => {
      console.log(err);
      res.status(500).send("Error fetching tasks");
  });
});

//POST Request for creating a new task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(result => {
        res.redirect('/tasks')
    })
    .catch(err => console.log(err))

})
//GET Request for finding each specific task
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findById(id).then(result => {
        res.render('details', {task: result})
    })
})
// GET Request for getting the create page
app.get('/create', (req, res) => {
    res.render("create");
})
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
  
    Task.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/tasks' });
      })
      .catch(err => {
        console.log(err);
      });
})

function sendAllMails() {
}
sendAllMails();
