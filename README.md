# Mobile Financial Service (MFS) Application - Client Side

## Project Overview

This project is a basic Mobile Financial Service (MFS) application similar to bKash or Nagad. The application includes features such as user authentication, send money, cash-out, balance inquiries, and more. The web interface is designed to be simple and secure.

## Live Link

- [Surge Live Link](https://flexiwalled.surge.sh/)

- [Vercel Live Link](https://flexiwalled.vercel.app/)

- [Netlify Live Link](https://flexiwalled.netlify.app/)

## Features

### User

- **Registration**: Users can register by providing their Name, 5-digit PIN, Mobile Number, and Email. Initially, user status is pending until approved by the admin.
- **Secure Login**: Users can log in using their Mobile Number/Email and PIN. JWT is used for authentication.
- **Send Money**: Users can send money to other users with PIN and JWT verification.
- **Cash-Out**: Users can cash out through an agent with PIN and JWT verification.
- **Cash-In**: Users can request cash-in through agents.
- **Balance Inquiry**: Users can check their account balance anytime.
- **Transaction History**: Users can view their last 10 transactions.

### Agent

- **Registration**: Agents can register by providing their Name, 5-digit PIN, Mobile Number, and Email. Initially, agent status is pending until approved by the admin.
- **Secure Login**: Agents can log in using their Mobile Number/Email and PIN. JWT is used for authentication.
- **Transaction Management**: Agents can manage cash-in and cash-out requests.
- **Balance Inquiry**: Agents can check their account balance anytime.
- **Transaction History**: Agents can view their last 20 transactions.

### Admin

- **Secure Login**: Admin can log in using their Mobile Number/Email and PIN. JWT is used for authentication.
- **User Management**: Admin can view all users, search for specific users, and manage user accounts.
- **System Monitoring**: Admin can see all transactions within the system.

## Technology Used

- **React.js**: For building the user interface
- **TanStack Query (formerly React Query)**: For data fetching and state management
- **React Router DOM**: For routing
- **Axios**: For making HTTP requests

## Installation

1. Clone the repository:

   ```bash
       git clone https://github.com/dreammehedi/mobile-financial-service.git

   ```

2. Install dependencies:

   ```bash
       npm install
       npm run dev
   ```

- The application will be available at http://localhost:5173

## Usage

- Open the application in your browser.
- Register as a user or agent.
- Log in with your credentials.
- Use the dashboard to perform various transactions and manage your account.

## Authentication

- JWT (JSON Web Token) is used for secure authentication. Tokens are generated upon login and stored in the browser for subsequent requests.

## Contact Information

If you have any questions, please contact me:

- [Facebook](https://www.facebook.com/dreammehedihassan/)

- [LinkedIn](https://www.linkedin.com/in/mehedi-hassan-miraj/)

- Gmail: dreammehedihassan@gmail.com

- Phone: +8801830143234

- [Portfolio Website](https://mehedihassan.vercel.app/)
