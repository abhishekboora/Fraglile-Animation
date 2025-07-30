// d:\Fragle\Animations\eslint.config.js

// Import necessary plugins and configurations.
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

/**
 * ESLint Flat Configuration for a React + Tailwind CSS project using Vite.
 *
 * This configuration file uses the new "flat" config format.
 * For more information, see: https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export default [
  // 1. Global ignores
  // This section defines files and directories that ESLint should completely ignore.
  {
    ignores: [
      'dist', // Ignore the build output directory.
      'node_modules', // Ignore all dependencies.
      '.DS_Store',
    ],
  },

  // 2. Base configuration for all relevant files
  // This object applies to all JS/JSX files and sets up the language options,
  // plugins, and settings for the entire project.
  {
    files: ['**/*.{js,jsx}'], // Apply this config to all JS and JSX files.

    // Plugins add extra rules and functionality to ESLint.
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
      tailwindcss: pluginTailwindcss,
      'react-refresh': pluginReactRefresh,
    },

    // Language options configure how ESLint understands your code.
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript features.
      sourceType: 'module', // Use ES modules.
      globals: {
        ...globals.browser, // Enable browser global variables.
        ...globals.node, // Enable Node.js global variables.
      },
      // Parser options are specific to the parser being used.
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing.
        },
      },
    },

    // Settings can be shared across all rules.
    settings: {
      react: {
        // Automatically detect the React version to use.
        version: 'detect',
      },
    },

    // The rules for our project.
    rules: {
      // Start with ESLint's recommended rules.
      ...js.configs.recommended.rules,
      // Add recommended rules from the React plugin.
      ...pluginReact.configs.flat.recommended.rules,
      // Add recommended rules from the React Hooks plugin.
      ...pluginReactHooks.configs.recommended.rules,
      // Add recommended rules from the JSX A11y plugin.
      ...pluginJsxA11y.configs.flat.recommended.rules,
      // Add recommended rules from the Tailwind CSS plugin.
      ...pluginTailwindcss.configs.flat.recommended.rules,

      // --- Custom rule overrides and additions ---
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ and the new JSX transform.
      'react/prop-types': 'off', // Disable prop-types if you are using TypeScript or prefer not to use them.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'tailwindcss/no-custom-classname': 'off', // It's common to have custom classes, so we can turn this off.
    },
  },
]