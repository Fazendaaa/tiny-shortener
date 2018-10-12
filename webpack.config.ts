import { join } from 'path';

module.exports = {
    target: 'node',
    mode: 'development',
    entry: join(__dirname, './src/tiny-shortener.ts'),
    node: {
        __dirname: false
    },
    output: {
        filename: 'tiny-shortener.js',
        path: join(__dirname, 'dist')
    },
    resolve: {
        alias: {
            cli: join(__dirname, './src/cli.ts'),
            parse: join(__dirname, './src/lib/parse.ts'),
            wrapper: join(__dirname, './src/lib/wrapper.ts'),
            'tiny-shortener': join(__dirname, './src/tiny-shortener.ts')
        },
        extensions: [
            '.js',
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /tests/
                ]
            }
        ]
    }
};
