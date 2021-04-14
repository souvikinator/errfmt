const execa = require('execa');
const Errfmt = require('./index');
const errfmt = new Errfmt();
(async () => {
    await execa('unknown', ['cmd'])
        .catch(err => {
            errfmt.withColor().print(err);
            console.log(err);
        });
})();