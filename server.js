const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());


app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: 'No file uploaded' })
    }
    const file = req.files.file
    console.log('files', req.files, 'file', file);

    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ file: file.name, filePath: `/upload/${file.name}` })
    })
})

app.listen(5000, () => {
    console.log('server started...')
})