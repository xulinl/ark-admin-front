/*
 * @Description:
 * @FilePath: \ark-admin-front\eslint.config.js
 */
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import oxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  // 添加或修改规则配置

  {
    extends: ['plugin:vue/vue3-recommended'],
    rules: {
      'vue/multi-word-component-names': 'off', // 关闭该规则
      'vue/no-parsing-error': [
        'error',
        {
          'x-invalid-end-tag': false,
        },
      ],
    },
  },
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  oxlint.configs['flat/recommended'],
  skipFormatting,
]
