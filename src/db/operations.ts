import type { Document, Filter, OptionalUnlessRequiredId } from "mongodb";
import { getDB } from "./client";

const getCollection = <T extends Document>(
  dbName: string,
  collectionName: string
) => getDB(dbName).collection<T>(collectionName);

export const createCollectionOperations = <T extends Document>(
  dbName: string,
  collectionName: string
) => {
  const insertOne = async (document: OptionalUnlessRequiredId<T>) => {
    const documentWithTimeStamp = addTimeStamp(document);

    await getCollection<T>(dbName, collectionName).insertOne(
      documentWithTimeStamp
    );
  };

  const insertMany = async (documents: OptionalUnlessRequiredId<T>[]) => {
    const documentsWithTimeStamp = documents.map(addTimeStamp);

    await getCollection<T>(dbName, collectionName).insertMany(
      documentsWithTimeStamp
    );
  };

  const updateOne = async (filter: Filter<T>, update: Partial<T>) => {
    const updateWithTimeStamp = updateTimeStamp(update);

    const res = await getCollection<T>(dbName, collectionName).updateOne(
      filter,
      { $set: updateWithTimeStamp }
    );
    return res.matchedCount;
  };

  const updateMany = async (filter: Filter<T>, update: Partial<T>) => {
    const updateWithTimeStamp = updateTimeStamp(update);

    const res = await getCollection<T>(dbName, collectionName).updateMany(
      filter,
      { $set: updateWithTimeStamp }
    );
    return res.matchedCount;
  };

  const findOne = async (filter: Filter<T>) =>
    await getCollection<T>(dbName, collectionName).findOne(filter);

  const findMany = async (filter: Filter<T>) =>
    await getCollection<T>(dbName, collectionName).find(filter).toArray();

  return { insertOne, insertMany, updateOne, updateMany, findOne, findMany };
};

const addTimeStamp = <T extends Document>(
  document: OptionalUnlessRequiredId<T>
) => {
  const currentTime = new Date();
  return { ...document, createdAt: currentTime, updatedAt: currentTime };
};

const updateTimeStamp = <T extends Document>(document: T) => {
  const currentTime = new Date();
  return { ...document, updatedAt: currentTime };
};
