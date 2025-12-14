# NGO Reporting System

This project allows NGOs to submit monthly impact reports individually or in bulk (CSV).
An admin dashboard aggregates and displays monthly impact data.

---

## Tech Stack

Frontend:
- React (Vite)

Backend:
- Node.js
- Express

Database:
- SQLite

Background Processing:
- Redis
- BullMQ

---

## Features

- Submit single NGO monthly reports
- Bulk CSV upload with background processing
- Job progress tracking
- Partial failure handling
- Admin dashboard with monthly aggregation
- Idempotent submissions (NGO + Month unique)

---

## Folder Structure

ngo-reporting-system/
├── backend/
└── frontend/

---

## Backend Setup

### 1. Install Redis
```bash
sudo apt install redis
# OR (Mac)
brew install redis
