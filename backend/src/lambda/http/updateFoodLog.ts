import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { UpdateFoodLogRequest } from '../../requests/UpdateFoodLogRequest'
import { getSingleFoodLog, updateFoodLog } from '../../businessLayer/foodLogs'

const logger = createLogger('updateFoodLog')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const foodLogId: string = event.pathParameters.todoId
  const updatedFoodLog: UpdateFoodLogRequest = JSON.parse(event.body)
  const userId = event.requestContext.identity.cognitoIdentityId
  const foodLog = await getSingleFoodLog(userId, foodLogId)

  if (foodLog.Count === 0) {
    logger.warn(`Cannot update food log id: ${foodLogId} for user id: ${userId}. It does not exist!`)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(`Cannot update non-existent food log`)
    }
  }

  logger.info(`Updating food log id: ${foodLogId} from user id: ${userId} with ${updatedFoodLog}`)

  await updateFoodLog(userId, foodLogId, updatedFoodLog)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify('Food log updated successfully!')
  }
}