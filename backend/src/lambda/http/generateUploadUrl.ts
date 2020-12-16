import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { GenerateUploadUrlRequest } from '../../requests/GenerateUploadUrlRequest'
import { getSingleFoodLog, getPresignedUrl } from '../../businessLayer/foodLogs'

const logger = createLogger('generateUploadUrl')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { foodLogId }: GenerateUploadUrlRequest = JSON.parse(event.body)
  const userId = event.requestContext.identity.cognitoIdentityId
  const foodLog = await getSingleFoodLog(userId, foodLogId)

  if (foodLog.length === 0) {
    logger.warn(`No food log found with id: ${foodLogId} for user ${userId}`)
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify('Food log not found.')
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl: getPresignedUrl(foodLogId)
    })
  }

}