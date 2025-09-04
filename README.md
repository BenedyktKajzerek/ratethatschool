# RateThatSchool (ratethatschool.com)

**Your resource for school reviews — by students, for students.**

---

## Overview

RateThatSchool is a web app designed to empower students worldwide to share honest and anonymous reviews of their schools. The platform serves as a trusted source of student-generated insights to guide others in choosing the right school experience.

---

## Features

- **Add Your School / View All Schools**  
  Students can browse schools by city or explore all entries available on the platform.

- **User-Generated Photos**  
  Users can upload photos along with their reviews. These images are displayed to enrich content and visual context.

- **Moderation Workflow**  
  Reviews and submitted content go through moderation before being published, maintaining quality and integrity.

- **Privacy-Conscious**  
  Minimal personal data is required. Email is only collected optionally for verification and communication purposes.

- **Anonymous Reviews**  
  Users have the option to submit their reviews anonymously, ensuring honest and unfiltered feedback.
  
---

## Technology Stack

- **Frontend**: Built with **Next.js**, **React**, **TypeScript**, and styled using **Tailwind CSS** for a fast and responsive UI.
  
- **Backend & Infrastructure**:
  - **Firebase**: Used for real-time database management and user authentication.
  - **Cloudinary**: Handles image storage and optimization, improving load times and performance.

---

## Workflow (Optional Sections)

### User Flow
1. User visits the homepage and searches or navigates by city.
2. User writes a review (optionally anonymous).
3. Review (and any accompanying images) is submitted.
4. The review enters a moderation queue.
5. After approval, review goes live on the site.

---
## Installation

To clone and run the project locally:
```bash
git clone https://github.com/benedyktkajzerek/ratethatschool.git
cd ratethatschool
npm install

# Create a .env.local file in the root directory and add your variables (Firebase, Cloudinary).

NEXT_PUBLIC_API_KEY=""
NEXT_PUBLIC_AUTH_DOMAIN=""
NEXT_PUBLIC_PROJECT_ID=""
NEXT_PUBLIC_STORAGE_BUCKET=""
NEXT_PUBLIC_MESSAGGING_SENDER_ID=""
NEXT_PUBLIC_APP_ID=""

# Optional: used internally for moderation/admin actions
ADMIN_EMAIL=""

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

npm run dev
```
