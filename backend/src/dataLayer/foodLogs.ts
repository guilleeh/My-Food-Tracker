import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { FoodLog } from '../models/FoodLog'

const XAWS = AWSXRay.captureAWS(AWS)

export default class FoodLogs {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly foodLogsTable = process.env.FOOD_LOGS_TABLE,
    private readonly createdAtIndex = process.env.CREATED_AT_INDEX
  ) { }

  async getFoodLogs(userId: string): Promise<FoodLog[]> {
    const result = await this.docClient.query({
      TableName: this.foodLogsTable,
      IndexName: this.createdAtIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    return result.Items as FoodLog[]
  }

  async createFoodLog(foodLog: FoodLog): Promise<void> {
    await this.docClient.put({
      TableName: this.foodLogsTable,
      Item: foodLog
    }).promise()
  }

  async getSingleFoodLog(userId: string, foodLogId: string): Promise<AWS.DynamoDB.QueryOutput> {
    return await this.docClient.query({
      TableName: this.foodLogsTable,
      KeyConditionExpression: 'userId = :user and foodLogId = :log',
      ExpressionAttributeValues: {
        ':user': userId,
        ':log': foodLogId
      }
    }).promise()
  }

}