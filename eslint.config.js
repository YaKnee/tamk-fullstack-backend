import js from "@eslint/js";

export default [
    js.configs.recommended,

   {
       rules: {
           "no-unused-vars": "warn",
           "no-undef": "warn",
           'no-console': 'warn', 
           'prefer-const': 'warn',
           'max-len': ['warn', { code: 100 }],
           'semi': ['warn', 'always'],
       }
   }
];
