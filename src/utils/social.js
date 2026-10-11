import { socialPlatforms } from "../data/socialPlatforms";

export function normalizeUsername(username = "") {
  return username.trim().replace(/^@/, "");
}

export function generateSocialUrl(
  platform,
  username
) {
  if (!platform || !username?.trim()) {
    return "";
  }

  const selected = socialPlatforms.find(
    (item) => item.value === platform
  );

  if (!selected) {
    return "";
  }

  return selected.buildUrl(
    normalizeUsername(username)
  );
}