export class CreateServiceTermDto {
  constructor(
    public title: string,
    public content: string,
    public isRequired: boolean,
  ) {}
}
