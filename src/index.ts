const dotenv = require('dotenv');

export type PluginTransformResults = {
    code?: string;
    id?: string;
};

export const env = () => {
    const { parsed: result } = dotenv.config();
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
