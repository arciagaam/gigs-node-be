import { Request, Response } from "express";
import { db, closeDb, connectDb } from "../db"
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "gigs";

const get = async (req: Request, res: Response) => {
    await connectDb();
    try {
        const query = await db.collection(COLLECTION_NAME).find({}).toArray();
        return res.status(200).json(query)
    } catch (error) {
        await closeDb();
        return res.status(400).json(error);
    }
}

const show = async (req: Request, res: Response) => {
    const id: ObjectId | null = req.params.id ? new ObjectId(req.params.id) : null;

    if (!id) {
        return res.status(400).json({ message: 'Invalid format.' });
    }

    await connectDb();

    try {
        const query = await db.collection(COLLECTION_NAME).find({ _id: id });
        await closeDb();
        return res.status(200).json(query);
    } catch (error) {
        await closeDb();
        return res.status(400).json(error);
    }
}

const insert = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    await connectDb();

    try {
        const data = { title, description }
        const result = await db.collection(COLLECTION_NAME).insertOne(data);

        await closeDb();
        return res.status(200).json(result);
    } catch (error) {
        await closeDb();
        return res.status(400).json(error);
    }
}

const destroy = async (req: Request, res: Response) => {
    const id: ObjectId | null = req.params.id ? new ObjectId(req.params.id) : null;

    if (!id) {
        return res.status(400).json({ message: 'Invalid format.' });
    }

    await connectDb();

    try {
        const result = db.collection(COLLECTION_NAME).deleteOne({_id: id});
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
}

const update = async (req: Request, res:Response) => {
    const { title, description} = req.body;
    const id: ObjectId | null = req.params.id ? new ObjectId(req.params.id) : null;

    if (!id) {
        return res.status(400).json({ message: 'Invalid format.' });
    }

    await connectDb();
    
    try {
        const data = { title, description }
        const result = db.collection(COLLECTION_NAME).updateOne({_id: id}, {
            $set: data
        });

        return res.status(200).json(result)

    } catch (error) {
        return res.status(400).json(error)
    }
}

export { get, show, insert, update, destroy }