const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Constructs full Cloudinary URL from public ID
 * Returns null if publicId is empty/null
 */
export function getCloudinaryUrl(
  publicId: string | null | undefined
): string | null {
  if (!publicId || publicId.trim() === "") return null;
  return `${CLOUDINARY_BASE_URL}/${publicId}`;
}
