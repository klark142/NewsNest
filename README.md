## Description
NewsNest is a simple web application that fetches the latest news using NewsAPI and displays them in a simple, comprehensive way. In addition to that, user is able to contribute their own news that is then visable to other readers. 

## Technologies Used
- **Node.js**: For the server-side logic and handling backend operations.
- **Express**: As the web application framework to manage routes and requests.
- **EJS**: Embedded JavaScript Templating used as the templating engine to dynamically generate HTML pages based on data.
- **MongoDB & Mongoose**: For database management, using MongoDB as the NoSQL database and Mongoose for schema-based modeling.
- **NewsAPI**: To fetch real-time news articles and headlines from various sources.
- **Bootstrap**: Integrated for responsive and modern web design.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- Node.js: [Download and install](https://nodejs.org/en/download/)
- MongoDB: [Download and install](https://www.mongodb.com/try/download/community).

Additionally, you will need a NewsAPI key to fetch news. You can obtain one by signing up at [NewsAPI](https://newsapi.org/register).

## Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure MongoDB
  Ensure MongoDB is running. The application is configured to connect to MongoDB at mongodb://127.0.0.1:27017/news, but you can change this in the index.js file if necessary.
3. Start the application
Run the application using the following command:
```bash
   node index.js
   ```
The application should now be running and accessible at http://localhost:3000/.
