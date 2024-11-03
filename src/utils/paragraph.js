export default function paragraph(article) {
  const firstParagraphMatch = article?.match(/<p[^>]*>(.*?)<\/p>/);
  const firstParagraphText = firstParagraphMatch
    ? firstParagraphMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
    : "";
  const para = firstParagraphText.substring(0, 100);
  return para;
}
