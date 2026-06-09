# PetNest: Pet Adoption Platform

PetNest is a comprehensive full-stack MERN (MongoDB, Express, React, Node.js) application designed to facilitate the seamless adoption of pets. Whether you are looking to find your next furry companion or a shelter aiming to manage listings, PetNest provides a secure and intuitive portal for all adoption workflows.

## Live URL
[Insert your live website URL here]

## Purpose
The purpose of PetNest is to digitize the pet adoption process. It serves as a centralized platform where users can browse various species, submit adoption requests, and manage their status, while pet owners can efficiently manage their listings, monitor requests, and approve or reject prospective adopters.

## Features
* **Dynamic Pet Directory:** Advanced browsing system with search (by name), filter (by species), and sorting (by adoption fee) capabilities using MongoDB operators.
* **Secure Authentication:** JWT-based authentication with HTTPOnly cookies to protect private routes and user data.
* **Role-Based Management:** Dedicated dashboards for pet owners to manage listings and requests, and for adopters to track their application status.
* **CRUD Operations:** Full Create, Read, Update, and Delete functionality for pet listings and adoption requests.
* **Interactive Adoption Workflow:** Real-time adoption status tracking with approval/rejection logic and automatic pet status updates upon adoption.
* **Theme Customization:** Seamless toggle between Light and Dark modes for better user accessibility and comfort.

## NPM Packages Used
* **Frontend:** `next`, `react`, `lucide-react`, `react-hot-toast`, `framer-motion`
* **Backend:** `express`, `mongodb`, `jsonwebtoken`, `cookie-parser`, `cors`, `dotenv`

## Technology Stack
* **Frontend:** React, Next.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT, HTTPOnly Cookies, BetterAuth

## How it Works
1.  **Browse:** Users can explore all available pets through the main directory.
2.  **Authenticate:** Users log in to gain access to adoption features.
3.  **Adopt:** Logged-in users submit adoption requests through detailed pet profiles.
4.  **Manage:** Pet owners can view requests on their dashboard, approve or reject them, and maintain their own pet listings.
5.  **Track:** All users can monitor the status of their submitted requests through the "My Requests" dashboard.