import { RokkitRunner, Rokkit, RokkitModules } from '@rokkit.ts/core'

@RokkitRunner
export class BookStoreApplication {
  constructor() {
    Rokkit.useModule(RokkitModules.WEB)
      .useDefaultConfiguration()
      .run()
    console.log('BookStoreApplication starting')
  }
}
