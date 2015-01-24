Encrypted Authentication Tokens
======================
![travis build](https://travis-ci.org/toastynerd/eat.svg?branch=master)

Tokens used for authentication purposes in a client/server app architecture.
Loosely based off the [encrypted token pattern by OWASP for preventing CSRF attacks](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet).
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
```

The resulting token will be base64 encoded and can be passed to client to use for
authentication against the server. The token should only be able to be encoded on the
server. *This is not a substitute for using ssl/tls* it should be used in conjuction
with a secure connection. If an attacker gets ahold of the token they will be able
to authenticate as the user until the token is expired or you change the salt/iv.
These functions can be called on eat as follows.

```javascript
if (server_compromised) {
  eat.genSalt(function() {
    console.log('salt generated');
  });

  eat.geniv(functon() {
    console.log('iv generated');
  });
}
```
Either one of these functions will invalidate any token generated when
using a different iv/salt. Another thing to keep in mind is that the
iv/salt get regenerated everytime the server is reset. So, a server
reset will invalidate all current tokens which might not be ideal for
your use case. You can set the iv/salt paramemters of the eat object
although be careful as this can open you up to replay attacks. The salt
can be length but the iv MUST be 32 bytes. Both must be contained in a buffer.
```javascript
var eat = require('eat');
eat.salt = buffer.new('my new salt');
eat.iv = buffer.new('a 32 byte string'); //this string isn't actullay 32 bytes
```
