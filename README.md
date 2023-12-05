# MegaMart E-commerce Server

Welcome to the MegaMart E-commerce Server, a backend API built with Express.js for a seamless e-commerce experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MegaMart E-commerce Server is the backend component of the MegaMart E-commerce application. It is responsible for handling authentication, managing products, processing orders, and integrating with third-party services such as Stripe and Cloudinary.

## Features

- User authentication with JSON Web Tokens (JWT)
- Secure password hashing using bcrypt
- Cloudinary integration for handling image uploads
- Cross-Origin Resource Sharing (CORS) configuration
- Environment variable management with dotenv
- MongoDB integration with Mongoose
- File uploading with Multer
- Stripe integration for processing payments

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

#### 1. Fork or clone the repository:

```bash
git clone https://github.com/sksabbirhossain/megamart-ecommerce-server.git
```

#### 2. Change to the project directory:

```bash
cd megamart-ecommerce-server
```

#### 3. Install dependencies (recommended use yarn):

```bash
yarn install
```

Or,

```bash
npm install
```

## Configuration

#### 1. Create a .env file in the root directory:

```bash
PORT=5000
MONGODB_URL=your MONGODB_URL
JWT_SECTET=your JWT_SECTET
STRIPE_SECRET_KEY=your STRIPE_SECRET_KEY
CLOUDINARY_CLOUD_NAME=your CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=your CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=your CLOUDINARY_API_SECRET
```

Update the values with your configuration details.

## Usage

#### 1. Start the server:

```bash
yarn run dev
```

Or,

```bash
npm run dev
```

The server will run at http://localhost:5000 by default.

## API Endpoints

Refer to the [API documentation](API_DOCUMENTATION.md) for detailed information on all endpoint.

## Contributing

If you have any suggestions on what to improve this website, please make a issue share your ideas and create your pull request.

## License

This project is licensed under the [MIT License](LICENSE.md). Feel free to use, modify, and distribute it as per the terms of the license.

Enjoy your seamless e-commerce experience with my MegaMart E-commerce server!. If you have any questions or encounter any issues, please create a issue or [contact me](https://www.linkedin.com/in/sk-sabbir-hossain/).
