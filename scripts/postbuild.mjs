import { readFile, writeFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import JavaScriptObfuscator from 'javascript-obfuscator'
import { minify as minifyHtml } from 'html-minifier-terser'

const distDir = path.resolve('dist')
const assetsDir = path.join(distDir, 'assets')

async function getFiles(dir, extension) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return getFiles(fullPath, extension)
    }

    return fullPath.endsWith(extension) ? [fullPath] : []
  }))

  return files.flat()
}

async function minifyIndexHtml() {
  const htmlPath = path.join(distDir, 'index.html')
  const html = await readFile(htmlPath, 'utf8')

  const minified = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
  })

  await writeFile(htmlPath, minified)
}

async function obfuscateJsAssets() {
  const jsFiles = await getFiles(assetsDir, '.js')

  await Promise.all(jsFiles.map(async file => {
    const code = await readFile(file, 'utf8')

    const obfuscated = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.35
    })

    await writeFile(file, obfuscated.getObfuscatedCode())
  }))
}

await minifyIndexHtml()
await obfuscateJsAssets()

console.log('Post-build complete: HTML minified and JavaScript obfuscated.')
