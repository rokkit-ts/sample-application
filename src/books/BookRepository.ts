import { Component } from '@rokkit.ts/core'
import { Book } from './Book'

@Component()
export class BookRepository {
  private books: Book[]

  constructor() {
    this.books = [
      new Book('1', 'Refactoring', 'Martin Fowler', new Date().toISOString()),
      new Book(
        '2',
        'Lord of the Rings',
        'J. R. R. Tolkin',
        new Date().toISOString()
      ),
      new Book(
        '3',
        "Harry Potter and the Philosopher's Stone",
        'J. K. Rowling',
        new Date().toISOString()
      )
    ]
  }

  findAll(): Book[] {
    return this.books
  }

  findOne(id: string): Book | undefined {
    return this.books.find(book => book.id === id)
  }

  create(book: Book): void {
    this.books.push(this.createId(book))
  }

  update(id: string, book: Book): Book | undefined {
    const bookToUpdate = this.findOne(id)
    if (bookToUpdate) {
      const index = this.books.indexOf(bookToUpdate)
      book.id = bookToUpdate.id
      this.books[index] = book
      return this.books[index]
    }
    return undefined
  }

  delete(id: string): void {
    const bookToDelete = this.findOne(id)
    if (bookToDelete) {
      const index = this.books.indexOf(bookToDelete)
      this.books.slice(index, 1)
    }
  }

  private createId(book: Book): Book {
    if (!book.id) {
      book.id = String(this.books.length + 1)
    }
    return book
  }
}
