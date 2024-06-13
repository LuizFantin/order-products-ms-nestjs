import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  total_value: number;

  @Column()
  quantity: number;

  @Column()
  customer_cep: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
