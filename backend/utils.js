export function checkUndefinedFields(result) {
  return {
    url: result.downloadUrl[4]?.url || "",
    name: result.name || "",
    year: result.year || "",
    album: result.album || " ",
    artist: result.artists.primary[0]?.name.replace(/&amp;/g, "&") || "",
    img: result.image[2]?.url || "",
    language: result.language || " ",
    duration: result.duration || " ",
  };
}
