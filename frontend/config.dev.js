module.exports = {
  env: {
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    API_GATEWAY_REGION: process.env.API_GATEWAY_REGION,
    API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    COGNITO_REGION: process.env.COGNITO_REGION,
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    COGNITO_APP_CLIENT_ID: process.env.COGNITO_APP_CLIENT_ID,
    COGNITO_IDENTITY_POOL_ID: process.env.COGNITO_IDENTITY_POOL_ID,
    API_ENDPOINT: 'http://localhost:8000',
  }
};
