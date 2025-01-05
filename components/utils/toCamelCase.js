export const toCamelCase = (str) => {
    return str
        .replace(/\s(.)/g, (match) => match.toUpperCase()) // Capitalize first letter after space
        .replace(/\s/g, '') // Remove all spaces
        .replace(/^(.)/, (match) => match.toLowerCase()); // Lowercase the first letter
};