# gather-identity-link

*Link your accounts such as github, discord, etc. with your gather account by saving public ids in a firestore.*

If no authenticated user is found, the site prompts for Log In with Firebase.

When a user is found, the site shows buttons to link accounts, and to log out of Firebase.

## Development

Quick Start:

```sh
npx webpack
firebase emulators:start
```

Navigate to <http://localhost:5001>

### Webpack

Running `npx webpack` will bundle everything needed into the `dist` folder.

### Emulators

#### Connect to the Auth Emulator

During development it can be helpful to connect to the local Auth Emulator rather than mess
around with the 'production' Auth Server.

At the bottom of `index.js` uncomment:

```js
// connectAuthEmulator(auth, "http://localhost:9099");
```

#### Deploy to the Hosting Emulator

`firebase: emulators:start` (note: this will also start the Auth Emulator)

### Deploy

`firebase deploy`
