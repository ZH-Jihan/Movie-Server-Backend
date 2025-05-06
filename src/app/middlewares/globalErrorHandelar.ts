import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import ApiError from "../utils/ApiError";

const globalErrorHandelar: ErrorRequestHandler = (error, req, res, next) => {
  // console.log(error.code === "P2025" ? "yes" : "no");
  console.log(error);
  //setting default values
  let status = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
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
        path: error?.meta?.modelName,
        message: error?.meta?.cause,
      },
    ];
  }else if (error instanceof ApiError) {
    status = error?.statusCode;
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
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

export default globalErrorHandelar;
