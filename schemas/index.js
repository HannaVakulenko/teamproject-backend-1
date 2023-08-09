const { taskSchema} = require('./task-schema');
const { reviewSchema} = require('./review-schema');
const { userRegisterSchema, userLoginSchema } = require('./user-schema');

module.exports = {
    taskSchema,

    reviewSchema,
        
    userRegisterSchema,
    userLoginSchema,
}