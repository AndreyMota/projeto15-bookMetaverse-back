import express, { json } from 'express';
import cors from 'cors';
import router from './Routes/indexRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use(router);

app.listen(PORT, () => console.log(`--------------- Server running on port ${PORT}`));