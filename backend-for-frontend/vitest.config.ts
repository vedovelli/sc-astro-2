/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config'
import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'tests/*', '*.spec.*'],
    include: ['**/__tests__/**'],
    globals: true,
  },
  resolve: {
    alias: {
      '~': r('./app'),
    },
  },
})
