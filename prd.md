# 🎭 SeatSphere – Auditorium Booking & Event Management System

## 📌 Overview

SeatSphere is a full-stack web application for managing auditorium bookings, event approvals, seat reservations, and QR-based entry validation in a college environment.

It includes advanced features such as real-time seat selection, concurrency handling, secure multi-factor authentication, and interactive 3D UI elements.

---

## 🎯 Objectives

* Enable clubs to request auditorium bookings
* Allow admins to approve/reject events
* Allow students to visually select and book seats
* Prevent seat conflicts in real-time
* Provide QR-based ticket validation
* Ensure secure authentication (OAuth + OTP)
* Deliver a modern UI with optional 3D experience

---

## 👥 User Roles

### Club

* Create event requests
* Define date, time, and event details
* View approval status

### Admin

* Approve/reject events
* Monitor bookings
* Manage platform usage

### Student

* View approved events
* Select seats via layout UI
* Book tickets and receive QR

### Validator

* Scan QR codes
* Validate entry
* Mark attendance

---

## 🔐 Authentication & Verification System

### Supported Methods

#### 1. Google OAuth Login/Signup

* One-click login/signup using Google
* Email is automatically verified

#### 2. Email OTP Verification

* OTP sent to email during signup
* Required for account creation (if not using Google)

#### 3. Phone OTP Verification

* OTP sent via SMS
* Mandatory for all users (even Google users)

---

## 🛡️ Account Creation Rules

* Account is created ONLY IF:

  * Email is verified (OTP or Google)
  * Phone number is verified (OTP)

---

## 🔄 User Flow

### 1. Authentication Flow

Signup:

* User enters name, email, phone
* Verifies email (OTP or Google)
* Verifies phone (OTP)
* Account created

Login:

* Google login OR email/password
* Optional future: OTP login

---

### 2. Event Creation

Club → submits event → `PENDING`
Admin → approves → `APPROVED`

---

### 3. Seat Selection (Visual Layout)

* Student sees auditorium layout (like BookMyShow)
* Seats categorized:

  * PRIME
  * CLASSIC
  * RECLINER
* Real-time availability shown

---

### 4. Booking Flow

* Student selects seat(s)
* Backend verifies availability
* Booking created using transaction
* QR code generated

---

### 5. Entry Validation

* QR scanned
* Backend validates booking
* Ticket marked as USED

---

## 🪑 Seat Layout System

### Structure

* Rows (A, B, C...)
* Seat numbers (1, 2, 3...)

---

### UI Features

* Grid-based layout (like BookMyShow)
* Color states:

  * Available → Green
  * Booked → Grey
  * Selected → Highlighted

---

### Data Representation

* Seats stored globally
* Bookings linked per event

---

## ⚔️ Concurrency Handling (CRITICAL)

### Problem

Multiple users selecting the same seat simultaneously

---

### Solutions

#### 1. Database Constraint

* UNIQUE(eventId, seatId)

---

#### 2. Transaction-Based Booking

* Atomic Prisma transaction:

  * Check availability
  * Insert booking

---

#### 3. Optional Seat Locking (Advanced)

* Temporary lock (2–5 minutes)
* Redis-based system (future enhancement)

---

#### 4. UI Handling

* Show error if seat is already booked
* Refresh seat state dynamically

---

## ⚙️ Functional Requirements

### Authentication

* Role-based access
* OTP + OAuth verification

---

### Event Management

* Create / approve / reject events
* Prevent overlapping bookings

---

### Seat Booking

* Visual seat selection
* Prevent duplicate seat booking

---

### QR System

* Unique QR per booking
* Single-use validation
* Encoded booking data

---

## 🎮 3D UI Integration

### Goal

Enhance user experience with interactive 3D elements

---

### Tools

* Spline
* Three.js 

---

### Use Cases

* 3D auditorium preview
* Interactive landing page
* Visual navigation

---

## 🧱 Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* ShadCN UI
* Spline (3D)
* Three.js 

---

### Backend

* Next.js API Routes
* Prisma ORM

---

### Database

* PostgreSQL (Neon)

---

### Authentication

* NextAuth (Auth.js)
* Google OAuth

---

### OTP Services

* Email: Nodemailer / Resend
* SMS: Twilio / MSG91

---

### Real-time (Optional)

* WebSockets / Pusher

---

## 🗄️ Core Entities

* User
* Event
* Seat
* Booking
* OTPVerification

---

## ⚠️ Constraints

* No overlapping events
* Unique seat per event
* QR usable only once
* OTP expires (5 minutes)

---

## 🚀 Future Enhancements

* Real-time seat updates
* Seat locking system
* Multi-auditorium support
* Analytics dashboard
* Attendance tracking
* Ticket transfer system

---

## 📈 Success Criteria

* Zero seat conflicts
* Secure authentication system
* Smooth booking experience
* Real-time responsiveness
* Scalable architecture

---
