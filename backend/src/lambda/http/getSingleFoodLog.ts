import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getSingleFoodLog } from '../../businessLayer/foodLogs'

const logger = createLogger('getSingleFoodLog')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const foodLogId: string = event.pathParameters.logId
  logger.info(event.pathParameters)
  const userId = event.requestContext.identity.cognitoIdentityId
  const foodLog = await getSingleFoodLog(userId, foodLogId)
  logger.info(foodLog)

  if (foodLog.length === 0) {
    logger.warn(`Cannot find food log id: ${foodLogId} for user id: ${userId}. It does not exist!`)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(`Cannot find food log`)
    }
  }

  logger.info(`food log id: ${foodLogId} from user id: ${userId} found!`)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ item: foodLog })
  }
}