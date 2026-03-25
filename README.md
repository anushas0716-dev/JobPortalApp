<<<<<<< HEAD
# JobSphere — Job Seeker Dashboard

A production-ready React dashboard implementing FR-16 from the Job Portal Application requirements.

## Features
- ✨ Recommended Jobs with match %
- 🔖 Saved Jobs with deadline countdown
- 🕐 Recently Viewed Jobs
- 📊 Application Tracker with animated bar chart & filter tabs
- 👤 Profile Completion with animated progress bar
- 🔔 Notifications with read/unread state

---

## How to Run

### Prerequisites
Make sure you have these installed:
- **Node.js** v16 or above → https://nodejs.org
- **npm** (comes with Node.js)

Check your versions:
```bash
node -v
npm -v
```

---

### Step 1 — Extract the ZIP
Unzip the downloaded file:
```bash
unzip jobsphere-dashboard.zip
cd jobsphere
```

### Step 2 — Install Dependencies
```bash
npm install
```
This downloads all required packages into a `node_modules/` folder.  
_(Takes ~1–2 minutes on first run)_

### Step 3 — Start Development Server
```bash
npm start
```
The app will open automatically at:
```
http://localhost:3000
```

---

## Project Structure

```
jobsphere/
├── public/
│   └── index.html            # HTML entry point
├── src/
│   ├── index.js              # React root render
│   ├── App.js                # App wrapper
│   ├── data/
│   │   └── dashboardData.js  # All mock data (jobs, notifications, etc.)
│   ├── styles/
│   │   └── dashboard.css     # All styles & CSS variables
│   └── components/
│       ├── Dashboard.jsx         # Main layout orchestrator
│       ├── Sidebar.jsx           # Left navigation sidebar
│       ├── StatCards.jsx         # 4 top stat cards
│       ├── RecommendedJobs.jsx   # FR-16: Recommended jobs
│       ├── ProfileCard.jsx       # FR-16: Profile completion %
│       ├── ApplicationTracker.jsx# FR-16: Application statistics
│       ├── SavedAndRecent.jsx    # FR-16: Saved + Recently viewed
│       └── NotificationsCard.jsx # FR-16: Notifications
└── package.json
```

---

## Build for Production
```bash
npm run build
```
Output goes to the `build/` folder — ready to deploy to any static host (Netlify, Vercel, etc.).

---

## Customizing Data
All mock data is in `src/data/dashboardData.js`.  
Edit the arrays to change job listings, notifications, application statuses, etc.
=======
# Company Registration Frontend

## 🎯 Overview

A modern React frontend for company registration and profile management, built for the Job Portal application.

## 🚀 Features

### **FR-12: Company Profile Management**
- ✅ **Multi-step registration form** with progress indicator
- ✅ **Company information fields**: Name, industry, website, size, location
- ✅ **Additional details**: Description, founded year, social media links
- ✅ **Logo upload** with drag-and-drop interface
- ✅ **Form validation** with real-time error handling
- ✅ **Review step** before final submission
- ✅ **Responsive design** for all devices
- ✅ **Modern UI** with smooth animations and transitions

### **Technical Stack**
- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS with custom components
- **Forms**: React Hook Form for validation
- **File Upload**: React Dropzone for logo handling
- **API Integration**: Axios for backend communication
- **Icons**: Lucide React for modern iconography
- **State Management**: React Context for auth and theme

## 📁 Project Structure

```
company-registration/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── pages/
│   │   ├── CompanyRegistration.js
│   │   └── CompanyDashboard.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation Steps
```bash
cd company-registration
npm install
npm start
```

### Environment Configuration
Create a `.env` file in the root:
```env
REACT_APP_API_URL=http://localhost:8001/api
```

## 🎨 Key Components

### **CompanyRegistration.js**
- Multi-step form with validation
- Logo upload with preview
- Progress indicators
- Responsive design
- Error handling

### **CompanyDashboard.js**
- Company statistics dashboard
- Navigation sidebar
- Stats cards with gradients
- Responsive grid layout

### **AuthContext.js**
- Authentication state management
- Login/logout functionality
- Token management

### **API Integration**
- Axios-based API service
- Proper error handling
- FormData support for file uploads

## 🎨 Features Implemented

### **Registration Flow**
1. **Step 1**: Basic company information
   - Company name, industry, website, size, location
   - Form validation and error handling
   
2. **Step 2**: Additional details
   - Company description, founded year, social media
   - Logo upload with drag-and-drop
   - Image preview functionality
   
3. **Step 3**: Review and submit
   - Review all entered information
   - Final validation before submission
   - Loading states and success feedback

### **UI/UX Features**
- **Responsive Design**: Mobile-first approach
- **Modern Styling**: Tailwind CSS with custom components
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Error Handling**: User-friendly error messages
- **Loading States**: Spinners and disabled states

## 🔧 API Integration

### **Endpoints Used**
- `POST /api/users/login/` - Authentication
- `POST /api/companies/register/` - Company registration
- `GET /api/companies/{id}/` - Company details
- `PUT /api/companies/{id}/` - Update company

### **Data Flow**
1. User fills registration form
2. Client-side validation
3. API submission with FormData
4. Backend validation and processing
5. Success response and redirect to dashboard

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Responsive**: Works on all screen sizes
- **Progressive Enhancement**: Graceful degradation

---


>>>>>>> ce394b553fba7a911f2cefdeb4d60912302943c0
