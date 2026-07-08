# QueueSmart - A2 Front-End

Team 20 - COSC 4355 - Assignment 2

## How to run

No build step. Just open `index.html` in a browser.

If your browser blocks the local file setup, run a quick static server:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Demo accounts

The app seeds these on first load:

- **User:** `user@test.com` / `password`
- **Admin:** `admin@test.com` / `password`

You can also register a new user through the sign-up page (accounts are stored in localStorage).

## File structure

```
queuesmart/
├── index.html               Login
├── register.html            Registration
├── dashboard.html           User dashboard
├── join-queue.html          Browse services and join a queue
├── queue-status.html        Live position + wait time
├── history.html             Past queues
├── admin-dashboard.html     Admin overview
├── service-management.html  Create / edit services
├── queue-management.html    Manage the queue for a service
├── css/styles.css           All styling
└── js/
    ├── data.js              Mock data + localStorage helpers
    ├── auth.js              Session + role-based guard
    └── notifications.js     Toast helper
```

## Tech stack

Plain HTML, CSS, and JavaScript. No frameworks, no build tools.

We picked this because:

- The assignment is front-end only with mocked data, so a framework would add complexity we don't need.
- Every browser can open it directly - no `npm install`, no dev server required for grading.
- Keeping the stack minimal means the team spends time on UI/UX decisions instead of tooling.
- All the required validations (required fields, length limits, email/number inputs) work with standard HTML5 attributes plus a small amount of JS.

Data is persisted in `localStorage` so joining a queue, creating a service, or serving a user actually feels working across page reloads. All of this is mock data - in later assignments this will move to a real backend.

## Features implemented

**Authentication**
- Login / register with email + password
- Client-side validation (required, email format, length, password match, duplicate email)
- Role-based redirect (user vs admin)
- Session guard on every protected page

**User side**
- Dashboard with queue status, open services, unread notifications
- Join queue with wait-time estimate per service
- Live queue status with position, wait time, status badge (Waiting / Getting close / Almost ready)
- History table of past queue activity

**Admin side**
- Dashboard with service overview, people-waiting, average wait
- Open/close services (quick action)
- Create/edit services with all required fields validated:
  - Name (required, max 100 chars)
  - Description (required)
  - Duration (required, 1-240 min)
  - Priority (required, low/medium/high)
- Queue management: reorder (up/down), remove user, serve next

**Notifications**
- In-app notification list on the user dashboard
- Toast messages on user actions
- Notifications also generated when an admin serves or removes a user

## Notes

- To reset the app to its seeded state, clear localStorage in dev tools (or run `localStorage.clear()` in the console) and refresh.
- Queue status auto-refreshes every 5 seconds so if you open it in one tab and manage the queue as admin in another, the user tab reflects changes.
