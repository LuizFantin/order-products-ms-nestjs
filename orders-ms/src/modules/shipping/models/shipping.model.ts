export class Shipping {
  constructor(
    readonly company_name: string,
    readonly service_name: string,
    readonly estimated_value: number,
    readonly estimated_time: number,
    readonly estimated_date: string,
  ) {}
}
