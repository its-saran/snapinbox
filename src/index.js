import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import v1GenerateRouter from './api/v1/routes/generateRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));

app.use("/api/v1/", v1GenerateRouter);

app.listen(PORT, () => {
    console.log(`Server is running on https://snapinbox.onrender.com/`);
    console.log(`API is listening on https://snapinbox.onrender.com/api/v1/generate`);
});



