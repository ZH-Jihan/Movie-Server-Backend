import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import { NewsletterServices } from "./newsletter.service";

export const getAllNewsletters = async (req: Request, res: Response) => {
  const newsletters = await NewsletterServices.getAllNewsletters();
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletters fetched successfully",
    data: newsletters,
  });
};

export const getNewsletterById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newsletter = await NewsletterServices.getNewsletterById(id);
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletter fetched successfully",
    data: newsletter,
  });
};

export const createNewsletter = async (req: Request, res: Response) => {
  const newsletter = await NewsletterServices.createNewsletter(req.body);
  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Newsletter created successfully",
    data: newsletter,
  });
};

export const updateNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newsletter = await NewsletterServices.updateNewsletter(id, req.body);
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletter updated successfully",
    data: newsletter,
  });
};

export const deleteNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await NewsletterServices.deleteNewsletter(id);
  if (!deleted)
    return res
      .status(404)
      .json({ success: false, message: "Newsletter not found" });
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletter deleted successfully",
  });
};

export const publishNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newsletter = await NewsletterServices.updateNewsletter(id, req.body);
  if (!newsletter)
    return res
      .status(404)
      .json({ success: false, message: "Newsletter not found" });
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletter published successfully",
    data: newsletter,
  });
};

export const unpublishNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newsletter = await NewsletterServices.updateNewsletter(id, req.body);
  if (!newsletter)
    return res
      .status(404)
      .json({ success: false, message: "Newsletter not found" });
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Newsletter unpublished successfully",
    data: newsletter,
  });
};
