import {DotenvConfigOptions, config} from 'dotenv';

export type PluginTransformResults = {
    code?: string;
    id?: string;
};

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
                code = code.replace(`process.env.${key}`, `"${result[key]}"`);
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
