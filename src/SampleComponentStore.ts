import { Component } from "@rokkit.ts/core";

@Component()
export class SampleComponentStore {
  private readonly greetings: string[];

  constructor() {
    this.greetings = [];
  }

  public addGreet(greet: string) {
    this.greetings.push(greet);
  }

  public getRandomGreeting() {
    const random = Math.round(Math.random() * (this.greetings.length - 1));
    return this.greetings[random];
  }
}
