import { Controller, Get } from "@rokkit.ts/web";
import { Inject } from "@rokkit.ts/core";
import { RequestParam } from "@rokkit.ts/web/lib/component/httpRequestParameterDecorators";

@Controller("/sample")
export class SampleController {
  private readonly greet: string;

  constructor(@Inject("Hello") greet: string) {
    this.greet = greet;
  }

  @Get("")
  greetWorld(): string {
    return `${this.greet} World`;
  }

  @Get("/:name")
  greetName(@RequestParam("name") name: string): string {
    return `${this.greet} ${name}`;
  }
}
