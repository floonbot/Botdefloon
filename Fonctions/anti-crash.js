var colors = require('colors');

module.exports = async () => {

    process.on('uncaughtException',async (error, origin) => {
        console.log(colors.magenta('----- Uncaught exception -----'));
        console.log(colors.brightGreen.bold(error));
        console.log(colors.magenta('----- Exception origin -----'));
        console.log(colors.gBrightYellow.bold(origin));
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log(colors.magenta('----- Unhandled Rejection at -----'));
        console.log(colors.brightBlue.bold(promise));
        console.log(colors.magenta('----- Reason -----'));
        console.log(colors.brightRed.bold(reason));
    });

    process.on('warning',async (name, message, stack) => {
        console.log(colors.magenta('----- Warning -----'));
        console.log(colors.brightCyan.bold(name));
        console.log(colors.magenta('----- Message -----'));
        console.log(colors.brightWhite.bold(message));
        console.log(colors.magenta('----- Stack -----'));
        console.log(colors.grey.bold(stack));
        });
    
};