export class Book {
  public id: string
  private author: string
  private name: string
  private published: string

  constructor(id: string, name: string, author: string, published: string) {
    this.id = id
    this.name = name
    this.author = author
    this.published = published
  }

  get Author() {
    return this.author
  }

  get Name() {
    return this.name
  }

  get Published() {
    return this.published
  }
}
