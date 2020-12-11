import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { CreateFoodLogRequest } from '../../requests/CreateFoodLogRequest'
import { createFoodLog } from '../../businessLayer/foodLogs'

const logger = createLogger('createFoodLog')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const foodLog: CreateFoodLogRequest = JSON.parse(event.body)
  const userId = event.requestContext.identity.cognitoIdentityId

  const newFoodLog = await createFoodLog(userId, foodLog)

  logger.info(`New food log ${foodLog} for user ${userId} created!`)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newFoodLog
    })
  }
}