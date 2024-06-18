# OrdersMS <-> ProductsMS - System Design

## Instalation and Running project
You need to have Docker Compose already installed. On the root of the project (where we have docker-compose.yml) you should run this command:
```bash
    docker-compose up --build
```
The above command will create 3 containers:
- MySQL (With the default schema already created) -> PORT 3306
- Products MS -> http://localhost:3030
- Orders MS -> http://localhost:3000

## Swagger Documentation
To access the Swagger documentation it is necessary to run each MS and access the respective endpoints:
- Products MS -> http://localhost:3030/api-docs
- Orders MS -> http://localhost:3000/api-docs

## Architecture Design
Project architecture flow and entities
```mermaid
flowchart LR

    User[User]
    Gateway(API Gateway)
    MS1(Orders MS)
    MS2(Products MS)
    db1[(Database)]
    Shipping(ShippingProvider)
    Admin

    User -->|Request| Gateway
    Gateway -->|POST /orders| MS1
    Gateway -->|GET /shipping| MS1
    MS1 <--> |Check Stock - HTTP| MS2
    MS1 <--> |Shipping quote| Shipping
    MS1 -->|Save order| db1
    MS2 -->|CRUD Products| db1

    Admin --> |CRUD Products| MS2
```


## Sequence Diagram
The project has 2 main sequence diagrams.The firt one for calculating shipping and the second one for creating an order

### Shipping quotation
```mermaid
sequenceDiagram
    actor User
    participant OrdersMS as Orders MS
    participant ShippingProvider as Shipping Provider
    
    User ->> OrdersMS: GET /shipping
    OrdersMS ->> ShippingProvider: GET shipping value
    ShippingProvider -->> OrdersMS: Shipping value
    OrdersMS -->> User: Estimated shipping date and value
```
### Order creation
```mermaid
sequenceDiagram
    actor User
    participant OrdersMS as Orders MS
    participant ProductMS as Products MS
    
    User ->> OrdersMS: Create new order
    OrdersMS ->> ProductMS: Check product stock
    ProductMS -->> OrdersMS: Stock available
    OrdersMS ->> ProductMS: Stock update
    ProductMS -->> OrdersMS: Stock updated
    OrdersMS -->> User: Order created
```



