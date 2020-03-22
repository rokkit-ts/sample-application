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
import { Book, BookFields } from './Book'
import { Response as RestifyResponse } from 'restify'
import { BookService } from './BookService'

@Controller('/books')
export class BookController {
  private service: BookService
  constructor(service: BookService) {
    this.service = service
  }

  @Get('')
  public getBooks() {
    console.log('Searching books')
    return this.service.findAll()
  }

  @Get('/:id')
  public getBook(@RequestPathParameter('id') id: string) {
    console.log('Searching book for', { id })
    return this.service.findOne(id)
  }

  @Post('')
  public addBook(
    @RequestBody(Book) book: Book,
    @Response() response: RestifyResponse
  ) {
    console.log('Adding new book', book)
    return response.send(201, this.service.add(book))
  }

  @Delete('/:id')
  public deleteBook(
    @RequestPathParameter('id') id: string,
    @Response() response: RestifyResponse
  ) {
    console.log('Delete book for', { id })
    this.service.delete(id)
    return response.send(204)
  }

  @Put('/:id')
  public updateBook(
    @RequestPathParameter('id') id: string,
    @RequestBody(Book) book: Book
  ) {
    console.log('Update book with', { id }, 'to', book)
    return this.service.update(id, book)
  }
  @Patch('/:id')
  public patchBook(
    @RequestPathParameter('id') id: string,
    @RequestBody()
    bookFields: BookFields
  ) {
    return this.service.patch(id, bookFields)
  }
}
