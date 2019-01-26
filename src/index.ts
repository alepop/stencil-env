import {DotenvConfigOptions, config} from 'dotenv';

export type PluginTransformResults = {
    code?: string;
    id?: string;
};

// https://stackoverflow.com/a/1144788/9238321
function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
}

export function env (options?: DotenvConfigOptions) {
    const { parsed: result } = config(options);
    return {
        name: 'env',
        transform: (
            sourceText: string,
            id: string,
        ): Promise<PluginTransformResults> => {
            let code = sourceText;
            Object.keys(result).forEach(key => {
                code = replaceAll(code, `process.env.${key}`, `"${result[key]}"`);
            });
            return new Promise(resolve => {
                return resolve({
                    id,
                    code,
                });
            });
        },
    };
};
