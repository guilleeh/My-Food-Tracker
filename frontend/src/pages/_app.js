import '../../styles/globals.css'
import { useState, useEffect } from 'react'
import { Amplify, Auth } from 'aws-amplify';

import { AppContext } from '../libs/context'
import { onError } from '../libs/error'

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

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad()
  }, []) // this will only run on the FIRST render

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setLoggedIn(true)
    } catch (e) {
      if (e !== 'No current user') {
        onError(e)
      }
    } finally {
      setIsAuthenticating(false);
    }
  }


  return (
    <>
      {!isAuthenticating && (
        <AppContext.Provider value={{ loggedIn, setLoggedIn }} >
          <Component {...pageProps} />
        </AppContext.Provider>
      )}
    </>
  )
}

export default MyApp
