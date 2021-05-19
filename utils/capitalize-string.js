export default function (str) {
  if (!str) {
    return "";
  }

  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}
