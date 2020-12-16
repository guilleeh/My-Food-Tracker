import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getSingleFoodLog, deleteFoodLog } from '../../businessLayer/foodLogs'

const logger = createLogger('deleteFoodLog')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const foodLogId: string = event.pathParameters.logId
  const userId = event.requestContext.identity.cognitoIdentityId
  const foodLog = await getSingleFoodLog(userId, foodLogId)


  if (foodLog.length === 0) {
    logger.warn(`Cannot update food log id: ${foodLogId} for user id: ${userId}. It does not exist!`)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(`Cannot update non-existent food log`)
    }
  }


  try {
    await deleteFoodLog(userId, foodLogId)

    logger.info(`Updated food log id: ${foodLogId} from user id: ${userId}`)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify('Food log deleted successfully!')
    }
  } catch (e) {
    logger.warn('There was an error deleting food log. ', e)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify('Failed to delete food log')
    }
  }
}