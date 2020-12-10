import * as uuid from 'uuid'
import { FoodLog } from "../models/FoodLog";
import { CreateFoodLogRequest } from "../requests/CreateFoodLogRequest";

import FoodLogs from '../dataLayer/foodLogs'

const FoodLogsAccess = new FoodLogs()

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