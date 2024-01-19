# **BookSphere: Collaborative and Personalized Book Management System**

BookSphere is an innovative full-stack web application that caters to book enthusiasts and readers looking to manage their personal book collections in a collaborative environment. 

This platform allows users to add, edit, and delete books from their own collections, while also being able to view collections added by others.


**Key Features:**

-> Personal Book Management: Users have full control over their own book entries. They can add new books to their collection, complete with details like author, genre, and cover image.

-> Edit and Delete Safeguards: While users can freely modify or remove books they've added, they cannot alter or delete entries made by others, ensuring personal data integrity and respect for each user's collection.

-> Community Engagement: Although editing and deleting are restricted to the user's own books, everyone can view all books in the system, promoting a sense of community and discovery among book lovers.


**Technologies Used:**

-> MongoDB Atlas - Used for storing application data

-> ReactJS - Used for frontend

-> NodeJS and ExpressJS - Used for backend







**Challenges Faced:**

-> State Management in React: Managing the state of numerous components in React, especially for real-time updates across various views, was a complex task. 

-> User Authentication and Authorization: Ensuring that each API request to edit or delete a book entry was authenticated and authorized correctly required careful design. This included checking if the user making the request was the same user who originally added the book.

**Future Features:**

-> Advanced Book Recommendations: Implement a machine learning algorithm to suggest books based on user preferences, reading history, and community trends.

-> Social Features: Integrate social features like book reviews, ratings, and user forums to foster a community of book lovers who can share insights and recommendations.

-> Personalized User Dashboards: Develop personalized dashboards offering insights into reading habits, progress tracking, and personalized book collections.



**How to Install and Run the Project**

To get this project up and running on your local machine for development and testing purposes, follow these steps:



**Prerequisites**

Ensure you have the following installed on your system:

-> Node.js (Download from Node.js website)
-> MongoDB (Follow the installation guide on the MongoDB website)
-> A modern web browser (like Chrome, Firefox, or Edge)

**Installation**

1) Clone the Repository:
   
   First, clone the project repository to your local machine using the command line or a Git client.

   ```
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

2) Install Backend Dependencies:

   Navigate to the backend directory (if your project is structured that way) and install the necessary Node.js packages.

   ```
   cd backend
   npm install
   '''

3) Setup Environment Variables:

   Create a .env file in the backend directory and add the necessary environment variables.

    ```
    DATABASE_URL=mongodb://localhost:27017/your-database
    TOKEN_KEY=your-secret-token-key
    ```

4) Start the MongoDB Database:

   Ensure MongoDB is running on your system. If you're using a local MongoDB server, it typically runs on localhost:27017.

5) Run the Backend Server:

   In the backend directory, start the Node.js server.

   `npm start`

6) Install Frontend Dependencies:

   Open a new terminal window. Navigate to the frontend directory and install the necessary packages.

   ```
   cd frontend
   npm install
   ```

7) Run the Frontend Application:

  Start the React application. It should open automatically in your default web browser.

  `npm start`



**Accessing the Application**

After following these steps, the backend server should be running on http://localhost:5000 and the frontend should be accessible at http://localhost:3000.



**How to Use the Project**

This section provides detailed instructions on how to use the BookSphere application, including steps to navigate through the app, manage book collections, and utilize its features.

1) SignUp Page(SignUp):

   -> UserName, email and password of the user is needed

   Email and Password Requirements:

   -> Email must be a valid email address format (e.g., example@email.com).

   -> Password must contain at least one uppercase letter.

   -> Password must contain at least one lowercase letter.

   -> Password must include at least one numeric digit.

   -> Password must have a minimum length of 8 characters.
   

2) Login Page(Login):

   -> Same email and password requirements as SignUp


3) Home Page(ListBook):

   -> Upon launching the application, you will be greeted with the home page. Here, you can view the list of all book collections.


4) Viewing Books:
   
   -> To view the details of a book, simply click on the book card. This will open a dialog showing detailed information about the book, such as the author, genre, and a brief description.


5) Adding a New Book (AddBook):
   
   -> Navigate to the 'Add Book' section from the main menu.

   -> Fill in the details of the book in the provided form, including the title, author, and genre.(author and title fields are given mandatory)

   -> Upload a cover image for the book.(if no cover image present then default image is taken)

   -> Click the 'Submit' button to add the book to your collection.


6) Editing a Book (EditBook):

   -> Only the user who added the book can edit its details.

   -> To edit a book, click on the 'Edit' icon on the book's card.

   -> Update the information in the form and submit the changes.(same validation of the data is done as in AddBook)


7) Deleting a Book (EditBook):

   -> If you wish to remove a book from your collection, click on the 'Delete' icon.(only the owner can delete)

   -> A confirmation prompt will appear. Confirm the deletion to remove the book permanently.


8) BookDetails Page:
   
   -> Detailed information of all the books present in the database can be viewed at one glance



**Data Persistence**

1) Book Storage: Information about books, including titles, authors, genres, and cover images, is persistently stored in the MongoDB database.

2) User Profiles: User account details, such as usernames, email addresses, and hashed passwords, are securely stored in the database.

3) No Data Loss: As a result, you won't lose any entered data due to accidental page refreshes or navigation within the application. Feel free to continue your tasks without worrying about data loss.


**Responsiveness of the Application:**

-> As we have used Material UI, our application seamlessly adjusts to various screen sizes, ensuring a smooth user experience regardless of the device being used.



**Error Handling:**

-> Error handling is done with API requests as well as data entry 



**Conclusion**

Congratulations! You've reached the end of this README, and you now have a clear understanding of our full-stack web application.





**Happy Coding**







   



    
