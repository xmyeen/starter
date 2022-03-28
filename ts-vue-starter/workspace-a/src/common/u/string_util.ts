export class StringUtil {
    format(formatString: string, ...replacements: string[]) {
        return formatString.replace(/{(\d+)}/g, function(match, number) { 
            return typeof replacements[number] != 'undefined' 
                ? replacements[number]
                : match
        });
    }
}
