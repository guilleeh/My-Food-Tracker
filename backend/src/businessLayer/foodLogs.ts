import * as uuid from 'uuid'
import { FoodLog } from "../models/FoodLog";
import { CreateFoodLogRequest } from "../requests/CreateFoodLogRequest";

import FoodLogs from '../dataLayer/foodLogs'
import Files from '../dataLayer/files'

const FoodLogsAccess = new FoodLogs()
const FilesAccess = new Files()

export const createFoodLog = async (userId: string, createFoodLogRequest: CreateFoodLogRequest): Promise<FoodLog> => {
  const id = uuid.v4()
  const createdAt = new Date().toISOString()
  const newFoodLog: FoodLog = {
    userId,
    foodLogId: id,
    createdAt,
    ...createFoodLogRequest
  }
  await FoodLogsAccess.createFoodLog(newFoodLog)
  return newFoodLog
}

export const getFoodLogs = async (userId: string): Promise<AWS.DynamoDB.DocumentClient.ItemList> => {
  const items = await FoodLogsAccess.getFoodLogs(userId)
  for (const item of items) {
    const url = await getAttachmentsUrl(item.foodLogId)
    if (url) {
      item.attachmentUrl = url
    }
  }

  return items
}

export async function getSingleFoodLog(userId: string, foodLogId: string): Promise<AWS.DynamoDB.QueryOutput> {
  return await FoodLogsAccess.getSingleFoodLog(userId, foodLogId)
}

export const getAttachmentsUrl = async (foodLogId: string): Promise<string> => {
  return await FilesAccess.getAttachmentsUrl(foodLogId)
}

export const getPresignedUrl = (foodLogId: string): string | null => {
  return FilesAccess.getPresignedUrl(foodLogId)
}