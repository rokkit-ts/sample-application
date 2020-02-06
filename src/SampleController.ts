import { Controller, Delete, Get, Post, Put } from "@rokkit.ts/web";
import { Inject } from "@rokkit.ts/core";
import {
  RequestBody,
  RequestPathParameter
} from "@rokkit.ts/web/lib/component/httpRequestParameterDecorators";
import { SampleComponentStore } from "./SampleComponentStore";

@Controller("/sample")
export class SampleController {
  private greet: string;
  private sampleComponentStore: SampleComponentStore;

  constructor(
    sampleComponentStore: SampleComponentStore,
    @Inject("Hello") greet: string
  ) {
    console.log("INIT");
    this.greet = greet;
    this.sampleComponentStore = sampleComponentStore;
    this.sampleComponentStore.addGreet("Test");
    this.sampleComponentStore.addGreet("Test2");
    this.sampleComponentStore.addGreet("Test3");
  }

  @Get("")
  @Get("/")
  greetWorld(): string {
    return `${this.sampleComponentStore.getRandomGreeting()} World`;
  }

  @Get("/:name")
  greetName(@RequestPathParameter("name") name: string): string {
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
