HEAD
# 🚀 Job Portal Application

A full-stack Job Portal system with multiple modules including Job Seeker Dashboard and Company Registration.

---

## 📌 Overview

This project includes:

### 🔹 JobSphere — Job Seeker Dashboard (FR-16)
A modern React dashboard for job seekers to track applications, view recommended jobs, and manage their profile.

### 🔹 Company Registration Frontend (FR-12)
A responsive React application for companies to register, manage profiles, and upload company details.

---

## ✨ Features

### 🧑‍💼 Job Seeker Dashboard
- 📊 Application Tracker with charts
- 🔖 Saved Jobs with expiry tracking
- 🕐 Recently Viewed Jobs
- 💼 Recommended Jobs with match %
- 👤 Profile Completion indicator
- 🔔 Notifications system

---

### 🏢 Company Registration
- Multi-step registration form
- Company details (name, industry, location, etc.)
- Logo upload with preview
- Form validation & error handling
- Review before submission
- Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Dropzone

### Backend
- Node.js (Express)
- Django (for APIs and models)

---

## 📁 Project Structure
jobportal/
├── frontend/ # React frontend
├── backend/ # Node.js backend
├── src/ # Dashboard components
├── applications/ # Application module
├── companies/ # Company module
├── candidates/ # Candidate module
├── jobs/ # Jobs module
├── users/ # User management
├── messaging/ # Messaging system
├── notifications/ # Notifications
└── manage.py # Django entry point

---

## ⚙️ Installation & Setup

### 🔹 Clone the repository
git clone https://github.com/your-username/JobPortalApp.git

cd JobPortalApp
---

### 🔹 Install dependencies

#### Frontend
cd frontend
npm install
npm start

#### Backend (Node.js)
cd backend
npm install
npm start

#### Django Backend
pip install -r requirements.txt
python manage.py runserver

---

## 🌐 Environment Variables

Create `.env` file:
REACT_APP_API_URL=http://localhost:8000/api

---

## 🚀 Build for Production
npm run build

---

## 📱 Browser Support
- Chrome
- Firefox
- Edge
- Safari

---

## 📌 Notes
- This project is part of Job Portal Application requirements.
- Includes both frontend and backend modules.
- Designed for scalability and real-world use.

---

## 👩‍💻 Author
**Anusha S**

---

## ⭐ If you like this project
Give it a ⭐ on GitHub!

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


upstream/jobportelteam
