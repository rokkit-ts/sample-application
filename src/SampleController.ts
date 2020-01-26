import { Controller, Delete, Get, Post, Put } from "@rokkit.ts/web";
import { Inject } from "@rokkit.ts/core";
import {
  RequestBody,
  RequestParam
} from "@rokkit.ts/web/lib/component/httpRequestParameterDecorators";

@Controller("/sample")
export class SampleController {
  private greet: string;

  constructor(@Inject("Hello") greet: string) {
    this.greet = greet;
  }

  @Get("")
  @Get("/")
  greetWorld(): string {
    return `${this.greet} World`;
  }

  @Get("/:name")
  greetName(@RequestParam("name") name: string): string {
    return `${this.greet} ${name}`;
  }

  @Post("")
  @Post("/")
  changeGreetPhrase(@RequestBody() body: { greet: string }) {
    console.log(body);
    this.greet = body.greet;
  }

  @Delete("")
  @Delete("/")
  restoreDefaultGreetPhrase() {
    this.greet = "Hello";
  }

  @Put("/:name")
  changeName(@RequestBody() body: { name: string }) {
    return `${this.greet} ${body.name}`;
  }
}
