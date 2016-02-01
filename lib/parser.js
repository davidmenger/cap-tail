'use strict';

const chalk = require('chalk');

module.exports = {

    parse (object) {
        const date = (object.timestamp || new Date()).toLocaleString();
        const message = object.message || '';
        const level = (object.level || '').substr(0, 1).toUpperCase();
        const meta = object.meta || {};

        console.log(`${chalk.yellow(date)} [${chalk.red(level)}]: ${chalk.blue(message)}`);

        if (Object.keys(meta).length !== 0) {
            console.dir(meta);
        }
    }

};
