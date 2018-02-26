/* global googleyolo */
export function hint() {
  return new Promise((resolve, reject) => {
    if(typeof googleyolo === "undefined") {
      window.onGoogleYoloLoad = yolo;
    } else {
      yolo(googleyolo);
    }

    function yolo (googleyolo) {
      const hintPromise = googleyolo.hint({
        supportedAuthMethods: [
          "https://accounts.google.com"
        ],
        supportedIdTokenProviders: [
          {
            uri: "https://mytoonami.herokuapp.com",
            clientId: "258532163434-9ojtut64kehv62ovrs4qcaal8gaomcsb.apps.googleusercontent.com"
          }
        ]
      });
      hintPromise.then((credential) => {
        if (credential.id) {
          resolve(credential);
        }
      }).catch((e) => {
        console.log(e);
        reject(e);
      });
    };
  });
};

export function sendUserToServer(credential) {
  console.log(process.env.host);
  return fetch('/api/sessions', {
    method: 'POST',
    body: JSON.stringify({
      "email": credential.id,
      "name": credential.displayName
    }),
  });
};

