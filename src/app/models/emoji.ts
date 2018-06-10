import { ListType } from './list-type.enum';

export class Emoji {
  constructor(
    public name: string,
    public url: string,
    public type: ListType = ListType.All
  ) {}
}
