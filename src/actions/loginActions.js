export function loginStarted() {
  return ({type: "LOGIN_STARTED", payload:{fetching: true}})
}

export function loginFulfilled(credential) {
  return ({type: "LOGIN_FULFILLED", payload:{id: credential.id, displayName: credential.displayName}})
}

export function userToServer(credential) {
  return ({type: "USER_SENT_TO_SERVER", payload:{userSentToServer: true}})
}
