# AI Habit Tracker (Backend)

<p align="center">
  <em>
    Scalable and maintainable backend powering the AI Habit Tracker platform,
    built with TypeScript, Express, MongoDB, Repository Pattern, Service Layer Architecture,
    SOLID Principles, and Gemini AI integration.
  </em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/ibrahimthadathil/Ai-habit-tracker-Backend?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
  <img src="https://img.shields.io/github/last-commit/ibrahimthadathil/Ai-habit-tracker-Backend?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
  <img src="https://img.shields.io/github/languages/top/ibrahimthadathil/Ai-habit-tracker-Backend?style=default&color=0080ff" alt="repo-top-language">
  <img src="https://img.shields.io/github/languages/count/ibrahimthadathil/Ai-habit-tracker-Backend?style=default&color=0080ff" alt="repo-language-count">
</p>

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Architecture](#architecture)
* [Software Design Principles](#software-design-principles)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [API Modules](#api-modules)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Environment Variables](#environment-variables)
* [Roadmap](#roadmap)
* [Related Repositories](#related-repositories)
* [Contributing](#contributing)
* [License](#license)
* [Author](#author)

---

## Overview

AI Habit Tracker Backend is a production-oriented REST API built with TypeScript and Express.js. It powers the AI Habit Tracker platform by managing authentication, habit tracking, analytics generation, AI-powered coaching, and user progress insights.

The application follows clean architecture concepts with strict separation of concerns through Controllers, Services, Repositories, Interfaces, Middleware, and Utilities.

Core responsibilities include:

* User Authentication & Authorization
* Habit Management
* Habit Completion Tracking
* Streak Calculation
* Weekly & Monthly Analytics
* AI-Powered Habit Coaching
* AI Weekly Reports
* Smart Habit Suggestions
* Secure API Access
* Data Persistence with MongoDB

---

## Features

### Authentication & Security

* JWT Authentication
* Password Hashing using Bcrypt
* Protected Routes
* Authentication Middleware
* Secure Token Validation

### Habit Management

* Create Habits
* Update Habits
* Delete Habits
* Archive Habits
* Habit Categorization
* Habit Scheduling

### Habit Tracking

* Daily Completion Logs
* Streak Tracking
* Completion History
* Progress Monitoring
* Recovery Suggestions

### Analytics Engine

* Weekly Statistics
* Monthly Statistics
* Category-Based Analytics
* Habit Performance Reports
* Heatmap Data Generation

### AI Features

* Gemini AI Integration
* AI Habit Coach
* Personalized Weekly Reports
* Smart Habit Recommendations
* Motivational Insights
* Behavioral Pattern Analysis

### Backend Engineering

* Repository Pattern
* Service Layer Architecture
* Dependency Injection
* Interface-Based Design
* Centralized Error Handling
* Modular Route Management
* Scalable Folder Structure

---

## Software Design Principles

This project follows industry-standard software engineering practices.

### SOLID Principles

#### Single Responsibility Principle (SRP)

Each layer has a dedicated responsibility:

* Controllers → HTTP Handling
* Services → Business Logic
* Repositories → Database Operations
* Middleware → Request Processing

#### Open Closed Principle (OCP)

New features can be introduced without modifying existing business logic by extending interfaces and implementations.

#### Liskov Substitution Principle (LSP)

Repository and Service implementations can be replaced without affecting consumers.

#### Interface Segregation Principle (ISP)

Separate interfaces are defined for repositories, services, and controllers.

#### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions rather than concrete implementations.

---

## Architecture

```text
Client Application
        ↓
Express Routes
        ↓
Controllers
        ↓
Services
        ↓
Repositories
        ↓
MongoDB Database
```

### AI Flow

```text
Client
   ↓
AI Controller
   ↓
AI Service
   ↓
Gemini API
   ↓
Generated Insights
```

---

## Tech Stack

### Language

* TypeScript

### Runtime

* Node.js

### Framework

* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* Bcrypt

### AI

* Gemini API

### Architecture

* Repository Pattern
* Service Layer Pattern
* Dependency Injection
* SOLID Principles
* Interface-Based Programming

### Utilities

* TypeDI
* Environment Variables
* Custom Error Handling

---

## Project Structure

```text
src/
├── config/
├── const/
├── controllers/
├── interfaces/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── types/
├── utils/
└── server.ts
```

---

## API Modules

### Authentication

* Register User
* Login User
* Token Verification

### Habits

* Create Habit
* Update Habit
* Delete Habit
* Archive Habit
* Get Habits

### Habit Logs

* Mark Completion
* Fetch Daily Logs
* Generate Statistics

### AI Insights

* Weekly Reports
* Habit Suggestions
* AI Coaching
* Motivation Generation

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_key
```

---

## Roadmap

### Completed

* [x] JWT Authentication
* [x] Habit Management
* [x] Habit Tracking
* [x] Analytics Engine
* [x] AI Integration
* [x] Repository Pattern
* [x] Service Layer Architecture
* [x] SOLID Principles Implementation

### Upcoming

* [ ] Refresh Token System
* [ ] Email Verification
* [ ] Notification Service
* [ ] Activity Feed
* [ ] Multi-Device Sync

---

## Related Repositories

### Frontend

https://github.com/ibrahimthadathil/Ai-habit-tracker-frontend

### Backend

https://github.com/ibrahimthadathil/Ai-habit-tracker-Backend

---

## License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

## Author

**Ibrahim Thadathil**

* MERN Stack Developer
* TypeScript Backend Developer
* Clean Architecture Enthusiast
* Repository Pattern Practitioner

GitHub:
https://github.com/ibrahimthadathil

```
```
