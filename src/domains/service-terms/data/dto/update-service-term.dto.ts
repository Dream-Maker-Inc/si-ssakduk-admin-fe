export class UpdateServiceTermDto {
  constructor(
    public title: string,
    public content: string,
    public isRequired: boolean,
  ) {}
}
