const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com");
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NzBiMDg1YmY2NDliNzI2YjM1NzQ3NjQwMzBlMWJkZTlhMTBhZTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODM3OTY5NjUsImF1ZCI6Ijk0MDY0NDIwOTMxLXZ1b2dwcWgydmVnaGlqMGY1NG1ncjZuc3JwZ2JiNGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0ODc5NzA0MTY1NDQ2Nzc5NTU5IiwiZW1haWwiOiJzaGFteWFrODVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6Ijk0MDY0NDIwOTMxLXZ1b2dwcWgydmVnaGlqMGY1NG1ncjZuc3JwZ2JiNGgyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6InNoYW15YWsgc2hhbXlhayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZX1dZekdjcjVfeERWT0JUUjVHY0VCR1daaWxrRllVSWgwMzRWeD1zOTYtYyIsImdpdmVuX25hbWUiOiJzaGFteWFrIiwiZmFtaWx5X25hbWUiOiJzaGFteWFrIiwiaWF0IjoxNjgzNzk3MjY1LCJleHAiOjE2ODM4MDA4NjUsImp0aSI6IjU1OTVhMTI3OTk5NjFjY2FkMDYxZmQwZWIwMDk3NGIzNDEyMzkyNTgifQ.mTZ2DRv1oD673vzmKqgK90USH3dgfI7LA0hmzZZZ0Ew8ezkOZVeFBVIsJg20kkoCCySlVAaMW61w1iGQBN3fPSMThDE3oFsEnyqSiwfAg01f7lud06dj3VImibZDs_OlfRzp7glWFd3CQFHw-QURf33Zkrb3YJazAxDYxr4K5k1pVB2K3em7r_l9DyU4gngXvFGgBqIuyq4hmlkOOsrOpP1p730EtTP-DeKDS9doBzerAJt3Gy85sZHUre4h8XA-WCKMRuIsA-AnqTloN25oKh4mue0dlar9In8ECT2niGTE5IuyPKax1JuoVW9AfweNKQe2wMPTni1Ti2n1eRJgmA",
      audience: "94064420931-vuogpqh2veghij0f54mgr6nsrpgbb4h2.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload)
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);