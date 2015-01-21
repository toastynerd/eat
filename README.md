Encrypted Authentication Tokens
======================
Tokens used for authentication purposes in a client/server app architecture.
Loosely based off the encrypted [token pattern by OWASP for preventing CSRF attacks](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet).
Tokens are encrypted using aes-256-ctr with a random IV and a password that's generated 
using crypto.pbkdf2 from an app secret with a 32 byte random salt.

```javascript
var eat = require('eat');

eat.encode({id: user.id, timestamp: Time.now}, 'mysupersecret', function(err, token) {
  if (err) throw err;
  //send token
});

eat.decode(token, 'mysupersecret', function(err, token) {
  if (err) throw err;
  //check if token is expired and if the id corresponds to a valid user
});
