import type { Document, Filter, OptionalUnlessRequiredId } from "mongodb"
import { getDB } from "./client"


const getCollection = <T extends Document>(collectionName: string) => getDB().collection<T>(collectionName)

const createCollectionOperations = <T extends Document>(collectionName: string) => {
  const insertOne = async (document: OptionalUnlessRequiredId<T>) => {
    const documentWithTimeStamp = addTimeStamp(document)
    
    await getCollection<T>(collectionName).insertOne(documentWithTimeStamp)
  }

  const insertMany = async (documents: OptionalUnlessRequiredId<T>[]) => {
    const documentsWithTimeStamp = documents.map(addTimeStamp)
    
    await getCollection<T>(collectionName).insertMany(documentsWithTimeStamp)
  }

  const updateOne = async (filter: Filter<T>, update: Partial<T>) => {
    const updateWithTimeStamp = updateTimeStamp(update)

    const res = await getCollection<T>(collectionName).updateOne(filter, {$set: updateWithTimeStamp})
    return res.matchedCount
  }

  const updateMany = async (filter: Filter<T>, update: Partial<T>) => {
    const updateWithTimeStamp = updateTimeStamp(update)

    const res = await getCollection<T>(collectionName).updateMany(filter, {$set: updateWithTimeStamp})
    return res.matchedCount
  }

  const findOne = async (filter: Filter<T>) =>
    await getCollection<T>(collectionName).findOne(filter)
  
  const findMany = async (filter: Filter<T>) => 
    await getCollection<T>(collectionName).find(filter).toArray()
}

const addTimeStamp = <T extends Document>(document: OptionalUnlessRequiredId<T>) => {
  const currentTime = new Date()
  return { ...document, createdAt: currentTime, updatedAt: currentTime} 
}

const updateTimeStamp = <T extends Document>(document: T) => {
  const currentTime = new Date()
  return { ...document, updatedAt: currentTime} 
}
