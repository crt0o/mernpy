// Some important stuff:
// - Put your python dependencies (tensorflow) in the requirements.txt file
// (you can get a list of dependencies along with their versions with 'pip3 freeze')
// - The Procfile should contain the same thing as the start script in package.json
// - Before pushing the files to heroku, run
// heroku buildpacks:set heroku/python
// and
// heroku buildpacks:add --index 1 heroku/nodejs

const express = require('express');
const app = express();
const { PythonShell } = require('python-shell');
const cors = require('cors');

app.use('/api', express.json());
app.use('/api', cors());
app.use('/', express.static('./static'));

app.post('/api', (req, res) => {

    // Options for PythonShell
    const options = {
        mode: 'json',
        pythonOptions: ['-u'],
        scriptPath: './',
    }

    // Create a new PythonShell instance (runs the python script)
    const pyShell = new PythonShell('./script.py', options);

    // Send req.body to the python process via stdin
    pyShell.send(req.body);

    // When the python child process sends a message to stdout,
    // complete the AJAX request and send the json data as a response
    pyShell.on('message', data => {
        res.status(200).json(data);
    });

    // End the python process and throw any errors
    pyShell.end(err => {
        if (err) throw err;
    });
})

app.listen(process.env.PORT || 3000);