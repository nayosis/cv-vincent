import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
  const isUserOrOrgPage = repo.endsWith('.github.io')

  // Priority:
  // 1) explicit BASE_PATH
  // 2) GitHub Actions auto-detection
  // 3) local root path
  const base = process.env.BASE_PATH
    || (process.env.GITHUB_ACTIONS
      ? (isUserOrOrgPage ? '/' : `/${repo}/`)
      : '/')

  return {
    plugins: [react()],
    base,
  }
})
