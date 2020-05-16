// Catches the async function when there is an error and sends it to the global error handler
const catchAsync = asyncFunction => {
    return (req, res, next) => {
        asyncFunction(req, res, next).catch(next);
    };
};

module.exports = catchAsync;
