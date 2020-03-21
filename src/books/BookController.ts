import {
  Controller,
  RequestPathParameter,
  Get,
  Post,
  RequestBody,
  Response,
  Delete,
  Put,
  Patch
} from '@rokkit.ts/web'
import { Book } from './Book'
import { Response as RestifyResponse } from 'restify'
import { log } from 'util'

@Controller('/books')
export class BookController {
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

  @Get('')
  public getBooks() {
    return this.books
  }

  @Get('/:id')
  public getBook(@RequestPathParameter('id') index: number) {
    if (index >= this.books.length) {
      throw new Error('This books does not exist')
    }
    return this.books[index]
  }

  @Post('')
  public addBook(
    @RequestBody(Book) book: Book,
    @Response() response: RestifyResponse
  ): void {
    console.log('Adding new book', book)
    if (!book.id) {
      book.id = this.books.length.toFixed()
    }
    this.books.push(book)
    return response.send(201, book)
  }

  @Delete('/:id')
  public deleteBook(
    @RequestPathParameter('id') index: number,
    @Response() response: RestifyResponse
  ) {
    console.log('Delete book for', { id: index })
    this.books.splice(index, 1)
    return response.send(204)
  }

  @Put('/:id')
  @Patch('/:id')
  public updateBook(
    @RequestPathParameter('id') index: number,
    @RequestBody(Book) book: Book
  ) {
    console.log('Update book with', { id: index }, 'to', book)
    this.books[index] = book
    return book
  }
}
