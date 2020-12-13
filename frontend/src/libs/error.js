export const onError = (error) => {
  let message = error.toString();

  // Here we handle errors from Auth
  if (!(error instanceof Error) && error.message) {
    message = error.message
  }

  alert(message)
}