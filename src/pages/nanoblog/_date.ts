const now = new Date();
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en-US");
export const formatDate = (date: Date) => {
  const msAgo = now.getTime() - date.getTime();
  const secondsAgo = Math.floor(msAgo / 1000);
  if (secondsAgo < 3600) {
    return "an hour ago";
  } else if (secondsAgo < 86400) {
    return relativeTimeFormatter.format(-Math.floor(secondsAgo / 3600), "hour");
  }
  return date.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" });
};
