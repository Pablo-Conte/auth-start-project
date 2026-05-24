import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        globals: true,
        env: {
            DB_DIRECT: 'test',
            DB_URL: 'test',
        },
        exclude: ['**/*Controller.ts', 'node_modules', 'dist'],
        coverage: {
            provider: 'istanbul',
            exclude: ['node_modules', 'test', '**/*Controller.ts', 'dist'],
            include: [
                'src/modules/*/useCases',
                'src/utils',
                '**/repositories/**/*.ts',
            ],
            thresholds: {
                lines: 95,
                functions: 95,
                branches: 95,
                statements: 95,
            },
        },
    },
});
