export function getArabicNumber (num: number) {
  return num.toString().replace(/\d/g, (digit) =>
    String.fromCharCode(digit.charCodeAt(0) + 1584)
  )
}
