import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const fullPath = path.join(__dirname, '/../routes')
  readdirSync(fullPath).map(async file => {
    if (!file.includes('.test.')) {
      const importedFile = `${fullPath}/${file}`;
      (await import(importedFile)).default(router)
    }
  })
}
