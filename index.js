const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a breif summary of your project?"
        },
        {
            type: "input",
            name: "contents",
            message: "Table of Contents"
        },
        {
            type: "input",
            name: "install",
            message: "Intallation"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage?"
        },
        {
            type: "input",
            name: "license",
            message: "Licenses?"
        },
        {
            type: "input",
            name: "contributing",
            message: "Contrabutions?"
        },
        {
            type: "input",
            name: "tests",
            message: "Tests"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "input",
            name: "Link",
            message: "Enter your App's link URL."
        }
    ]);
}

function generateHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">${answers.title}</h1>
    <p class="lead">About my project: ${answers.descriptions}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">Table of Contents: ${answers.contents}</li>
      <li class="list-group-item">Installations: ${answers.install}</li>
      <li class="list-group-item">Usage: ${answers.usage}</li>
      <li class="list-group-item">License: ${answers.license}</li>
      <li class="list-group-item">Contributions: ${answers.contributing}</li>
      <li class="list-group-item">Table of Contents: ${answers.tests}</li>
      <li class="list-group-item">Web app link: ${answers.link}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
    .then(function (answers) {
        const html = generateHTML(answers);

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });
