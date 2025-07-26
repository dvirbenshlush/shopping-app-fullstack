# Shopping App - Fullstack Project (Docker-based Setup)

This is a fullstack shopping list app where users can browse categories, choose products, add them to a cart, and complete the order through a simple checkout form.

This README focuses on how to run the app easily using Docker, and also includes a high-level explanation of how you'd set this up in the cloud using modern DevOps practices.

## Tech Stack

- Frontend: React + TypeScript
- Backend for Products: ASP.NET Core 8 + SQL Server
- Backend for Orders: Node.js + TypeScript + Express
- Database: SQL Server (for products) + OpenSearch (for orders)

---

## How to Run the Project with Docker

Make sure Docker is installed on your machine.

### 1. Clone the project

```bash
git clone https://github.com/dvirbenshlush/shopping-app-fullstack
cd shopping-app-fullstack
```

### 2. Start all services

```bash
docker-compose up --build
```

This will spin up:

- SQL Server with test data
- .NET API for categories & products
- Node.js API for handling orders
- Frontend React app

The app will be available at: `http://localhost:3000`

---

## Seeding the Database (Optional)

You can manually run this SQL to populate test data into the categories and products tables:

```sql
INSERT INTO Categories (Name) VALUES ('Vegetables'), ('Meat'), ('Dairy');
INSERT INTO Products (Name, Price, Description, CategoryId) VALUES
('Tomato', 3.5, 'Fresh tomato', 1),
('Cucumber', 2.5, 'Green cucumber', 1),
('Onion', 1.9, 'Dry onion', 1),
('Ground Beef', 19.9, '500g ground beef', 2),
('Steak', 32.5, 'Entrecote steak', 2),
('Minced Chicken', 17.3, '500g minced chicken', 2),
('Milk 3%', 6.2, '1L milk 3% fat', 3),
('Cottage Cheese', 5.5, '250g cottage', 3);
```

---

## Cloud & DevOps (Theory)

If you'd like to host this in the cloud, here's one possible way using AWS (you could also use Azure with similar ideas).

### Architecture Overview

```
Browser
  |
CloudFront (CDN)
  |
S3 (Frontend App)
  |
Application Load Balancer
  |                 |
.NET API         Node.js API
  |                 |
SQL Server     OpenSearch
```

### Key Components

- **S3** – for hosting the static frontend (React)
- **CloudFront** – for fast delivery of static assets globally
- **Elastic Beanstalk or ECS Fargate** – to run the .NET API and Node.js API
- **Amazon RDS** – for managed SQL Server
- **OpenSearch Service** – to store and search through orders
- **CloudWatch + X-Ray** – for monitoring, logs, and traces
- **Secrets Manager / Parameter Store** – for safe management of secrets
- **ACM + Load Balancer** – for SSL and secure HTTPS access

### Automation & DevOps

- **CI/CD**: Use GitHub Actions to automatically test, build, and deploy the app on every push.
- **Infrastructure as Code**: Use Terraform or AWS CloudFormation to manage all cloud resources automatically.
- **Monitoring**: Set up alarms in CloudWatch to alert if CPU, memory, or error rate increases.
- **Security**: Restrict access with security groups, and store sensitive config using AWS Secrets Manager.
- **Auto Scaling**: Enable autoscaling for services to handle high traffic.

This approach helps you build a scalable, reliable system with good performance and maintainability.

---

## Summary

This project is a simple but complete fullstack app that demonstrates a modern approach to web development and cloud deployment. You can run everything locally with Docker, or scale it up in the cloud using standard DevOps tools.
