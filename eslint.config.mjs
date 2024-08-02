import react from "eslint-plugin-react";
import eslint from "@eslint/js";
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: [
            "**/*.ts",
            "**/*.tsx"
        ],
        plugins: {
            react
        },
        languageOptions: {
            globals: {},
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig-base.json"
            }
        },

        settings: {
            react: {
                version: "detect"
            }
        },

        rules: {
            "@/quotes": [
                "error",
                "double"
            ],
            "@typescript-eslint/no-explicit-any": ["off"],
            quotes: [
                "error",
                "double"
            ],
            "@/indent": [
                "error",
                4
            ],
            indent: [
                "error",
                4
            ],
            "@/space-before-function-paren": [
                "error",
                {
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "never"
                }
            ],

            "space-before-function-paren": [
                "error",
                {
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "never"
                }
            ]
        }
    }
)
