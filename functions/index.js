const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { exchangeWebFlowCode } = require('@octokit/oauth-methods');
const { Octokit } = require('@octokit/core');

exports.saveUsername = functions.https.onCall(async (data, context) => {

  const app = initializeApp();
  const firestore = getFirestore();

  const { data, authentication } = await exchangeWebFlowCode({
    clientType: 'oauth-app',
    clientId: '3b2457d371c7b9b4a1b8',
    clientSecret: 'a380bb8917f3b3c52151fbe65ec8172bb798946a',
    code: data.code,
    scopes: [],
  });
  
  console.log(data);
  console.log(authentication.token);

  const octokit = new Octokit({auth: authentication.token})
  const userResponse = await octokit.request('GET /user', {});

  console.log(userResponse);
  console.log(userResponse.login);

  const writeResult = firestore.collection('users').doc(context.auth.uid).set({github : username}, {merge: true});

  // return admin.database().ref(`/users/${}`).push( {
        
  // }).then(()=> {
  //         console.log('New Person Added');
  //         return 'Done Successfully';
  // }).catch((error)=> {
  //         throw new functions.https.HttpsError('unknown', error.message, error);
  // })
});