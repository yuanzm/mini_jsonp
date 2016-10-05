# miniJsonp
A simple implement of jsonp.

## Usage
It's easy to download miniJsonp from Github and npm. miniJsonp loads a remote JSON object using a JSONP request.
### Install
- Clone source files from Github: 
    + `git clone https://github.com/yuanzm/mini_jsonp`
    + `<script src="dist/mini_jsonp.js"></script>`
- Install from npm:
    + `npm install --save miniJsonp`
    + `var miniJsonp = require('miniJsonp'); // UMD support`
    + `import miniJsonp from 'miniJsonp'; // es6 support`

### API
`miniJsnop(url, params, func, opts);`

#### url - String
The url to request.
```
http://foo.com/
```
#### params - Object
Data to be sent to the server. It is converted to a query string, and then appended to the url. Object must be key/value pairs. 
```
{
	foo: 'bar'
}
```

#### func - Function
A function to be called if the request succeeds.The Function gets passed one argument `data`, The JSON object returned from the server.
```
function (data) {
    console.log(data);;
}
```
#### opts - Object
An optional object to define custom actions.
`opts.prefix`    : the prefix of callback function name.(you don't have to care about this actually :));
`opts.paramName` : the param name of callback in url, default to `callback`.
`opts.timeout`   : default to 6000 ms.
`opts.className` : the className of jsonp script.

## Test
```
npm install
npm run test
```

## Demo
You can run demo with command `npm run demo`.
```
<script type="text/javascript" src="dist/mini_jsonp.js"></script>
<script type="text/javascript">
    miniJsonp(
        'http://192.168.0.101:3000/testJsonp',
        {foo: 'bar'},
        function(data) {
            document.getElementById('result').innerHTML = data.result;
        }
    );
</script>
```