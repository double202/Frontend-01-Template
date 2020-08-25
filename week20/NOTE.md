# 每周总结可以写在这里

## github OAuth

https://docs.github.com/en/developers/apps/building-github-apps

https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps

* 获取 `code`

encodeURIComponent('http://localhost:8080')

client publish-tool 唤起浏览器

```
https://github.com/login/oauth/authorize?client_id=Iv1.c8feb07434f0ef91&redirect_uri=http%3A%2F%2Flocalhost%3A8080&state=abc123
```

server publish-server

```js
let client_id = 'Iv1.c8feb07434f0ef91';
let client_secret = '622f82b41a6bfbe9058bd2e0bf100886e3ad1c14';
let code = 'c089d9028caf7be2aa52';
let redirect_uri = encodeURIComponent('http://localhost:8080');
let state = 'abc123';

let params = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}&state=${state}`;

let xhr = new XMLHttpRequest();
xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true);
xhr.send(null);

xhr.addEventListener('readystatechange', (event) => {
    if (xhr.readyState === 4)
        console.log(xhr.responseText)
})

access_token = '0555a1237f3f707a412a05d257c2a176b32debc7'

```

client/server publish-tool/publish-server
```
GET shttps://api.github.com/user?access_token=0555a1237f3f707a412a05d257c2a176b32debc7&state=abc123
```



