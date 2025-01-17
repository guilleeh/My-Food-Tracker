
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

export default class Files {
  constructor(
    private readonly s3Bucket = process.env.FOOD_LOGS_S3_BUCKET,
    private readonly s3Client: AWS.S3 = new XAWS.S3({
      signatureVersion: 'v4'
    }),
    private readonly signedUrlExpireSeconds = 60 * 5
  ) { }

  async getAttachmentsUrl(foodLogId: string): Promise<string | null> {
    try {
      await this.s3Client.headObject({
        Bucket: this.s3Bucket,
        Key: `${foodLogId}.png`
      }).promise()
      const url = this.s3Client.getSignedUrl('getObject', {
        Bucket: this.s3Bucket,
        Key: `${foodLogId}.png`,
        Expires: this.signedUrlExpireSeconds
      })
      return url
    } catch (error) {
      return null
    }
  }

  getPresignedUrl(foodLogId: string): string {
    return this.s3Client.getSignedUrl('putObject', {
      Bucket: this.s3Bucket,
      Key: `${foodLogId}.png`,
      Expires: this.signedUrlExpireSeconds
    })
  }
}