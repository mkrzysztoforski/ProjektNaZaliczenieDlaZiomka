import cors from 'cors';
import express from 'express';

import { ResteX } from '@reste/x';
import { HomeController } from './controllers/HomeController';
import { NoteController } from './controllers/NoteController';
import { NoteService } from './services/NoteService';

import 'reflect-metadata';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

NoteService.init();

ResteX.createApp(app, [HomeController, NoteController]);

app.listen(port, () => console.log(`Server started at port ${port}`));

app.on('error', (error: any) => console.log('Error:', error));
