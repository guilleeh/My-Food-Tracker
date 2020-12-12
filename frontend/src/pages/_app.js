import '../../styles/globals.css'
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_APP_CLIENT_ID
  },
  Storage: {
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET,
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "logs",
        endpoint: process.env.API_GATEWAY_URL,
        region: process.env.API_GATEWAY_REGION
      },
    ]
  }
});

console.log(Amplify)

function MyApp({ Component, pageProps }) {
  console.log
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
