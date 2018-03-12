export function loginStarted() {
  return ({type: "LOGIN_STARTED", payload:{fetching: true}})
}

export function loginFulfilled(userData) {
  return ({type: "LOGIN_FULFILLED", payload:{credential: {email: userData.credential.email, name: userData.credential.name, id: userData._id}, data: userData.data}})
}
