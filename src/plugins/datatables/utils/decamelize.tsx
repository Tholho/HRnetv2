/**
 * Decamelizes a string with/without a custom separator (underscore by default).
 * 
 * @param str String in camelcase
 * @param separator Separator for the new decamelized string.
 */
export default function decamelizeCapitalize(str: string, separator: string) {
        separator = typeof separator === 'undefined' ? '_' : separator;

        const strWithSep = str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
                .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
                .toLowerCase();
        const words = strWithSep.split(" ")
        const finalStr = words.map((word) => {
                return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
        return finalStr
}