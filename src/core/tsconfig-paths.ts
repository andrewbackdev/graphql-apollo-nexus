import * as tsConfigPaths from 'tsconfig-paths'
import * as fs from 'fs'

const tsConfigContent = fs.readFileSync('tsconfig.json', 'utf-8')

const tsconfig: Tsconfig = JSON.parse(tsConfigContent)

interface Tsconfig {
  compilerOptions: {
    rootDir: string
    paths: { [key: string]: string[] }
  }
}

tsConfigPaths.register({
  baseUrl: tsconfig.compilerOptions.rootDir,
  paths: tsconfig.compilerOptions.paths,
})
