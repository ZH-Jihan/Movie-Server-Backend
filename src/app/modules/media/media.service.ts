import { Media, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { uploadImgToCloudinary } from "../../middlewares/uploadImgToCloudinary";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";
import PrismaQueryBuilder from "../../utils/QueryBuilder";

// Create new media
const createMedia = async (payload: Media, files: any) => {
  // Poster
  const posterFile = files?.file?.[0];
  const imgUrl = posterFile
    ? await uploadImgToCloudinary(posterFile.path, payload.title)
    : { secure_url: undefined };

  // Cover Image
  const coverFile = files?.coverImage?.[0];
  const coverUrl = coverFile
    ? await uploadImgToCloudinary(coverFile.path, payload.title + "-cover")
    : { secure_url: undefined };

  // Screenshots
  const screenshotFiles = files?.screenshots || [];
  let screenshotUrls: string[] = [];
  if (screenshotFiles.length > 0) {
    const uploaded = await Promise.all(
      screenshotFiles.map((file: any, idx: number) =>
        uploadImgToCloudinary(file.path, payload.title + "-screenshot-" + idx)
      )
    );
    screenshotUrls = uploaded.map((u: any) => u.secure_url);
  }

  const newMedia = await prisma.media.create({
    data: {
      ...payload,
      posterUrl: imgUrl.secure_url as string,
      coverImage: coverUrl.secure_url as string,
      screenshots: screenshotUrls,
    },
  });

  return newMedia;
};

// Get all media with search, filter, sort, and pagination
const getAllMedia = async (query: any) => {
  const queryBuilder = new PrismaQueryBuilder<
    Media, // T = Media model type
    Prisma.MediaWhereInput, // Where = Prisma's generated MediaWhereInput
    Prisma.MediaSelect // Select = Prisma's generated MediaSelect
  >(query);

  const mediaList: Media[] = await prisma.media.findMany(
    queryBuilder
      .search(["title", "description"])
      .filter() // apply other exact-match filters if any
      .sortBy() // apply ?sortBy and ?sortOrder
      .paginate() // apply ?page and ?limit
      .fields() // apply ?fields selection
      .build()
  );

  return mediaList;
};

// Get featured media based on average rating
const getFuturedMedia = async () => {
  const mediaList: Media[] = [];

  const topRated = await prisma.review.groupBy({
    by: ["mediaId"],
    where: { isApproved: true },
    _avg: { rating: true },
    orderBy: { _avg: { rating: "desc" } },
    take: 5,
  });
  for (const entry of topRated) {
    const media = await prisma.media.findUnique({
      where: { id: entry.mediaId },
    });
    if (media && media.isPublished) mediaList.push(media);
  }
  return mediaList;
};

// Get media by ID with reviews and purchases
const getMediaById = async (id: string) => {
  const media = await prisma.media.findUnique({
    where: { id: id },
    include: {
      reviews: {
        where: { isApproved: true },
        include: { user: true, likes: true },
      },
      purchases: true,
    },
  });
  if (!media || !media.isPublished) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "Media not found or not published"
    );
  }
  // Calculate average rating
  const ratings = media.reviews.map((r: { rating: number }) => r.rating);
  const avgRating = ratings.length
    ? (
        ratings.reduce((a: number, b: number) => a + b) / ratings.length
      ).toFixed(1)
    : 0;
  return { media, avgRating };
};

// Update media by ID
const updateMediaById = async (id: string, payload: Media) => {
  const media = await prisma.media.update({ where: { id: id }, data: payload });
  return media;
};

// Delete media by ID
const deleteMediaById = async (id: string) => {
  const media = await prisma.media.delete({ where: { id: id } });
  return media;
};

export const MediaServices = {
  createMedia,
  getAllMedia,
  getFuturedMedia,
  getMediaById,
  updateMediaById,
  deleteMediaById,
};
