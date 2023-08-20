import express from "express";
import { getGigs } from "./gigs";

const routes = () => {
    const router = express.Router();
    router.use('/gigs', getGigs());
    
    return router;
}

export {routes}