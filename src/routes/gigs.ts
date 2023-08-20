import express, {Request, Response} from "express"
import { get, show, insert, update, destroy } from "../controllers/gigs";
const getGigs = () => {
  const router = express.Router();

  router.get('/list', get);
  router.get('/show/:id', show);
  router.post('/insert', insert);
  router.put('/update/:id', update);
  router.delete('/delete/:id', destroy);

  return router;
}

export {getGigs}