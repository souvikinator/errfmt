# errfmt

Call your errors beautiful again 😎
Package to apply makeup over your errors 💄 

## Output

### without errfmt

![result](https://i.imgur.com/OlcacBJ.png)

### with errfmt

**colored**

![color result](https://i.imgur.com/88I6fHr.png)

**without color**

![without color result](https://i.imgur.com/z1vNuPs.png)

## Usage:

### display whole error

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt({
  colored:true //false by default
});

//print formatted error
errfmt.print(err);
//get formatted error string(no print)
let fmterr=errfmt.render(err);
console.log(fmterr);
```

or

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt();

//change config on the go
errfmt.withColor().print(err);
let fmterr=errfmt.withoutColor().render(err);
console.log(fmterr);
```

### display selective error fields

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt({
  colored:true,
  include:["stack","code","message"] //list of error properties to be displayed
});

errfmt.print(err);
```
or

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt({
  colored:true
});

errfmt.include("code","message","stack").print(err);
```

### exclude selective error fields

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt({
  colored:true,
  exclude:["stack","code","message"] //list of error properties not to be displayed
});

errfmt.print(err);
```
or

```js
const Errfmt=require('errfmt');
const errfmt=new Errfmt({
  colored:true
});

errfmt.exclude("code","message","stack").print(err);
```

## Doesn't look good?

It's not great but you can make it better. Feel free to contribute :)
