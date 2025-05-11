"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            message: "Validation error",
            errors: result.error.errors,
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.default = validateRequest;
