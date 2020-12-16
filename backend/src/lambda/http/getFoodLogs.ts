import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getFoodLogs } from '../../businessLayer/foodLogs';

const logger = createLogger('getFoodLogs')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = event.requestContext.identity.cognitoIdentityId
  logger.info(`Retrieving food logs for user ${userId}`)

  const foodLogs = await getFoodLogs(userId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: foodLogs
    })
  }
}