"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    plugins: [(0, vite_tsconfig_paths_1.default)()],
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
//# sourceMappingURL=vite.config.js.map