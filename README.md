# Supabase & React Task Manager Tutorial

This repository contains a tutorial project that demonstrates how to use **Supabase** as a backend for a React application, including CRUD operations, authentication, and security via Row Level Security (RLS) policies.

---

## Table of Contents

- [Overview](#overview)  
- [Course Timeline & Learning Outcomes](#course-timeline--learning-outcomes)  
- [Getting Started](#getting-started)  
- [Supabase Setup](#supabase-setup)  
- [Database Tables & Editor](#database-tables--editor)  
- [Row Level Security (RLS) Policies](#row-level-security-rls-policies)  
- [Integrating Supabase with React](#integrating-supabase-with-react)  
- [CRUD Operations](#crud-operations)  
  - [Create (Insert)](#create-insert)  
  - [Read (Select)](#read-select)  
  - [Delete](#delete)  
  - [Update](#update)  
- [Authentication](#authentication)  
- [Technologies Used](#technologies-used)  
- [References](#references)

---

## Overview

This project is based on a Supabase tutorial from Youtube channel name PedroTech that shows how to build a task manager with a React frontend. You will learn how to use Supabase as a **Backend-as-a-Service (BaaS)**, set up a PostgreSQL database, implement **Row Level Security (RLS)**, and integrate the backend with React for complete CRUD functionality.

---

## Course Timeline & Learning Outcomes

The tutorial covers the following topics:

### 1. Understanding Supabase as a Backend-as-a-Service 
- Learn that Supabase is an open-source alternative to Firebase.
- Understand integration with PostgreSQL and developer-friendly ecosystem.
- Gain knowledge to streamline backend development.

### 2. Setting Up Your Supabase Project 
- Create a Supabase account and organization.
- Create a new project and configure PostgreSQL database password.
- Select the appropriate region for your project.

### 3. Database Tables and Editor 
- Use the table editor to create new tables (e.g., `users` table).
- Define columns with data types such as text, integer, etc.
- Set default values, enforce nullability, and ensure uniqueness.
- Insert data directly into the tables.

### 4. Implementing Row Level Security (RLS) Policies 
- Learn about **RLS**, a crucial security feature.
- Define policies for **SELECT**, **INSERT**, **UPDATE**, and **DELETE** operations.
- Apply conditions based on user roles (anonymous, authenticated).
- Protect your data while allowing authorized access.

### 5. Integrating Supabase with React for CRUD Operations 
- Connect your React application to Supabase.
- Build a simple **Task Manager** app implementing CRUD.

#### a. Create (Insert) 
- Insert new tasks from the React app into Supabase tables.

#### b. Read (Select)
- Fetch and display tasks from the Supabase table.

#### c. Delete 
- Delete specific tasks based on their ID.

#### d. Update 
- Modify existing task descriptions.

### 6. Introduction to Authentication 
- Briefly covers **user authentication**.
- Learn about sign-in, sign-up, and session handling for users.

---

## Getting Started

### Prerequisites
- Node.js >= 16.x
- npm or yarn
- Supabase account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/supabase-react-task-manager.git

2.Install dependencies:
cd supabase-react-task-manager
npm install

3.Configure Supabase client in your React app:
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)


## Supabase Setup

1. Create a [Supabase](https://supabase.com/) account.  
2. Set up an organization and create a new project.  
3. Configure the **PostgreSQL database password** and select the appropriate **region**.  
4. Enable **Row Level Security (RLS)** on tables you will secure.  
5. Create a **storage bucket** (e.g., `tasks-images`) if you plan to upload task images.

---

## Database Tables and Editor

- Use the Supabase table editor to create tables like `users` and `tasks`.  
- Define columns with proper data types, nullability, uniqueness, and default values.  

**Example `tasks` table structure:**

| Column       | Type       | Notes                                      |
|--------------|-----------|-------------------------------------------|
| `id`         | integer   | Primary key, auto-increment               |
| `title`      | text      | Task title                                |
| `description`| text      | Task description                          |
| `email`      | text      | User email (foreign key reference)        |
| `image_url`  | text      | Public URL of task image                  |
| `created_at` | timestamp | Default `now()`                           |

- Insert sample data directly using the editor for testing.

---

## Row Level Security (RLS) Policies

- **RLS** secures data access based on user roles (authenticated, anonymous, public).  
- Example policies for the `tasks` table:

| Operation | Role          | Condition                                      |
|-----------|---------------|-----------------------------------------------|
| SELECT    | public        | `true` (everyone can read tasks)             |
| INSERT    | authenticated | `email = auth.jwt() ->> 'email'`             |
| UPDATE    | authenticated | `email = auth.jwt() ->> 'email'`             |
| DELETE    | authenticated | `email = auth.jwt() ->> 'email'`             |

- Ensure **Storage RLS** for uploading task images:

**Upload (INSERT) policy for `storage.objects` bucket `tasks-images`:**

```sql
bucket_id = 'tasks-images'





