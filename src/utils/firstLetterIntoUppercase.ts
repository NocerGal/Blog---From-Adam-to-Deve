export default function firstLetterIntoUppercase(str: string) {
  const firstLetter = str.charAt(0).toUpperCase();

  const strWithoutFirstLetter = str.slice(1).toLowerCase();

  const strFirstLetterUppercased = `${firstLetter}${strWithoutFirstLetter}`;

  return strFirstLetterUppercased;
}
