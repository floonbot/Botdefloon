var clc = require("cli-color");

module.exports = async () => {

    process.on('uncaughtException', async (error, origin) => {
        console.log(clc.redBright.underline('----- Uncaught exception -----'));
        console.log(clc.redBright.bold(error));
        console.log(clc.cyanBright.underline('----- Exception origin -----'));
        console.log(clc.blue.bold(origin));
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log(clc.yellowBright.underline('----- Unhandled Rejection at -----'));
        console.log(clc.yellowBright.bold(promise));
        console.log(clc.whiteBright.underline('----- Reason -----'));
        console.log(clc.whiteBright.bold(reason));
    });

    process.on('warning', async (name, message, stack) => {
        console.log(clc.greenBright.underline('----- Warning -----'));
        console.log(clc.greenBright.bold(name));
        console.log(clc.blackBright.underline('----- Message -----'));
        console.log(clc.blackBright.bold(message));
        console.log(clc.blueBright.underline('----- Stack -----'));
        console.log(clc.blueBright.bold(stack));
    });

};