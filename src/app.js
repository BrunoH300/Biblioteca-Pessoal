const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const livroRoutes = require('./routes/livroRoutes');
const autoresRoutes = require('./routes/autoresRoutes')
const editorasRoutes = require('./routes/editorasRoutes')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/livros', livroRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/editoras', editorasRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
