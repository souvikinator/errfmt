const chalk = require('chalk');
const padeven = require('pad-even');

let metadata = {
    colored: false,
    padding: 15,
    include: [],
    exclude: []
}

function Errfmt(options = metadata) {
    this.metadata = Object.assign(metadata, options);
    this.print = print;
    this.render = render;
    this.include = include;
    this.exclude = exclude;
    this.withColor = function () { this.metadata.colored = true; return this; };
    this.withoutColor = function () { this.metadata.colored = false; return this; };
}

/**
 * @param  {...string} prop
 */
function include(...prop) {
    this.metadata.include = [...new Set(prop)];
    return this;
}

/**
 * @param  {...string} prop 
 */
function exclude(...prop) {
    this.metadata.exclude = [...new Set(prop)];
    return this;
}

/**
 * 
 * @param {object} error 
 * @returns prints the formatted error
 */
function print(error) {
    const excludeProp = this.metadata.exclude;
    const includeProp = this.metadata.include.filter(p => !excludeProp.includes(p));
    if (includeProp.length > 0) {
        if (this.metadata.colored) {
            console.log(prettycolor(includeProp, error));
            return;
        }
        console.log(pretty(includeProp, error));
        return;
    }
    const prop = Object.getOwnPropertyNames(error).filter(p => !excludeProp.includes(p));
    if (this.metadata.colored) {
        console.log(prettycolor(prop, error));
        return;
    }
    console.log(pretty(prop, error));
}

/**
 * @param {object} error 
 * @returns formatted error
 */
function render(error) {
    const excludeProp = this.metadata.exclude;
    const includeProp = this.metadata.include.filter(p => !excludeProp.includes(p));
    if (includeProp.length > 0) {
        if (this.metadata.colored) {
            return prettycolor(includeProp, error);
        }
        return pretty(includeProp, error);
    }
    // fromat all error obj properties
    const prop = Object.getOwnPropertyNames(error).filter(p => !excludeProp.includes(p));
    if (this.metadata.colored) {
        return prettycolor(prop, error);
    }
    return pretty(prop, error);
}

// formats the error (non color)
const pretty = function (prop, error) {
    let err = "";
    prop.forEach(p => {
        if (error[p] != undefined && typeof error[p] !== "function") {
            error[p].toString().split('\n').forEach(ln => {
                err += `[ERR] ${padeven(p, metadata.padding)} | ${ln}\n`;
            });
        }
    });
    return err;
}

// formats the error (color)
const prettycolor = function (prop, error) {
    let err = "";
    prop.forEach(p => {
        if (error[p] != undefined && typeof error[p] !== "function") {
            error[p].toString().split('\n').forEach(ln => {
                err += `${chalk.bgBlack.redBright('ERR')} ${padeven(p, metadata.padding)} | ${chalk.italic(ln)}\n`;
            });
        }
    });
    return err;
}

module.exports = Errfmt;
