import { ObjectId } from "mongodb";
import z from "zod";

const documentIdSchema = z.string().refine(id => ObjectId.isValid(id))

export default documentIdSchema