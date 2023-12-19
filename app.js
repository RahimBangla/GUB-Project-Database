import dotenv from "dotenv";
import express from "express";
import path from "path";
import { handleError } from "./src/middlewares/handleError.js";
import { notFound } from "./src/middlewares/notFound.js";
import notesRoute from "./src/resources/notes/notes.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// set the view engine to ejs
app.set('view engine', 'ejs');
//middleware
app.use(express.json());

// index page
app.get('/', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get("/ok", (req, res) => {
  res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>");
});
// api routes
app.use("/notes", notesRoute);
// Define the directory where your static files (including HTML) are located
app.use(express.static('public'))
app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log('Server started at http://localhost:' + port);
});
