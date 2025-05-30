import { Router } from "express";
import * as newsletterController from "./newsletter.controller";

const router = Router();

router.get("/", newsletterController.getAllNewsletters);
router.get("/:id", newsletterController.getNewsletterById);
router.post("/", newsletterController.createNewsletter);
router.put("/:id", newsletterController.updateNewsletter);
// router.patch("/:id/publish", newsletterController.publishNewsletter);
// router.patch("/:id/unpublish", newsletterController.unpublishNewsletter);

export const NewsletterRoutes = router;
