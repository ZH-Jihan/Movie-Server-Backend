"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const globalErrorHandelar = (error, req, res, next) => {
    var _a, _b;
    // console.log(error.code === "P2025" ? "yes" : "no");
    console.log(error);
    //setting default values
    let status = 500;
    let message = "Something went wrong!";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // handling not found error
    if (error.code === "P2025") {
        status = 404;
        message = "Data not found!";
        errorSources = [
            {
                path: (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.modelName,
                message: (_b = error === null || error === void 0 ? void 0 : error.meta) === null || _b === void 0 ? void 0 : _b.cause,
            },
        ];
    }
    else if (error instanceof ApiError_1.default) {
        status = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    //ultimate return
    res.status(status).json({
        success: false,
        status,
        message,
        errorSources,
        error
    });
};
exports.default = globalErrorHandelar;
