import { RokkitRunner } from '@rokkit.ts/core'

@RokkitRunner('./src')
export class BookStoreApplication {
  constructor() {
    console.log('BookStoreApplication starting')
  }
}
