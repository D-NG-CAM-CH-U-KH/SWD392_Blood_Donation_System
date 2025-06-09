export default class TextUtils {
    static formatValueName(fieldKey: string) {
        return fieldKey
            // Insert space before uppercase letters that are followed by lowercase letters
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            .replace(/([a-z])([A-Z])/g, '$1 $2')          // insert space between lower & upper case
            .replace(/^./, str => str.toUpperCase())      // capitalize first letter
            .trim();
    }
}