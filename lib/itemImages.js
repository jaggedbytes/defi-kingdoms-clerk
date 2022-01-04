import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const itemImagesDirectory = path.join(process.cwd(), 'public/images/items')

export function getImageFilenames() {
  const itemImagesFilenames = fs.readdirSync(itemImagesDirectory)
  return itemImagesFilenames
}