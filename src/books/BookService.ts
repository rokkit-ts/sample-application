import { Service } from '@rokkit.ts/core'
import { Book, BookFields } from './Book'
import { BookRepository } from './BookRepository'

@Service()
export class BookService {
  private repository: BookRepository
  constructor(repository: BookRepository) {
    this.repository = repository
  }

  findAll(): Book[] {
    return this.repository.findAll()
  }
  findOne(id: string): Book {
    const book = this.repository.findOne(id)
    if (book) {
      return book
    } else {
      throw new Error(`There is no book with ${{ id }}`)
    }
  }
  add(book: Book): Book {
    this.repository.create(book)
    return book
  }

  update(id: string, book: Book): Book {
    const updatedBook = this.repository.update(id, book)
    if (updatedBook) {
      return updatedBook
    } else {
      throw new Error(`There is no book with ${{ id }}`)
    }
  }

  patch(id: string, bookFields: BookFields) {
    const storedBook = this.findOne(id)
    const bookToPatch = new Book(
      storedBook.id,
      bookFields.name ?? storedBook.Name,
      bookFields.author ?? storedBook.Author,
      bookFields.published ?? storedBook.Published
    )
    return this.update(id, bookToPatch)
  }

  delete(id: string): void {
    this.repository.delete(id)
  }
}
