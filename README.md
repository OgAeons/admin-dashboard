# Admin Dashboard with Role-Based Access Control (RBAC) UI

A modern and secure Admin Dashboard with a Role-Based Access Control (RBAC) UI, designed for managing users, roles, and permissions efficiently. Built with React and Tailwind CSS, this dashboard provides an intuitive interface with enhanced security features and real-time functionality.

## 🌟 Features

### User Management
- View, add, edit, and delete users
- Assign roles and manage user status
- Real-time search and filter functionality
- Form validation for user data inputs
- User-specific access and settings management

### Role Management
- Create and manage roles with different permissions
- Visual permission management interface
- Dynamic role assignment and role-specific permissions
- Easy role editing and deletion

### Dark Mode Toggle
- Switch between light and dark modes seamlessly
- Customizable theme for a better user experience

### Security Features
- Role-based access control for system security
- Secure form submissions using validation libraries
- API error handling and user feedback for secure communication
- Logs the activity of roles or permissions changes

### Dashboard
- Overview of system statistics
- User and role distribution statistics
- Quick access to all key functionalities

## 🚀 Technical Implementation

### Frontend Stack
- **React**: For building the dynamic and interactive UI
- **Tailwind CSS**: For utility-first, responsive styling
- **React Router**: For seamless navigation across pages
- **LocalStorage**: For persistent storage across pages
- **React Context API**: For global state management (e.g., dark mode toggle)

### Key Components
- **UserManagement**: Handles all user CRUD operations, user details display, and role assignment
- **RoleManagement**: Interface to create, assign, edit, and delete roles, along with permission management
- **Dashboard**: Provides an overview of system metrics, users, and roles
- **Layout**: A responsive page structure with a collapsible sidebar for improved navigation and mobile-friendliness

## 📱 Responsive Design
- Mobile-first approach with Tailwind CSS for responsive layout
- Adaptive design, Collapsible sidebar 

## 🔒 Security Features
- **Role-Based Access Control** (RBAC) to ensure users have appropriate permissions
- **Secure API communication** with token-based authentication
- **Input validation** using Zod to prevent SQL injections and malicious input
- **Protected routes** to ensure only authorized users can access sensitive pages
- **Error handling and user feedback** to prevent data leaks and improve security

## 🎨 UI/UX Features
- **Dark Mode** and **Light Mode** for user comfort
- **Smooth transitions** between light/dark modes
- **Intuitive navigation** with hover effects and dropdown menus for ease of use
- **Sortable and filterable tables** for easy data management

## Running Locally

### Steps to Run Locally:
1. Clone the repository:
   `git clone https://github.com/OgAeons/admin-dashboard.git`
   `cd admin-dashboard`

2. Install dependencies:
   `npm install`

3. Run the code:
   `npm run dev`


## 📝 Assignment Evaluation Criteria Met

### Creativity and Design Quality
- Modern, clean, and intuitive interface
- Consistent design language with Tailwind CSS
- Responsive layouts that adapt to mobile, tablet, and desktop

### Functionality
- Complete CRUD operations for users and roles
- Seamless dark mode toggle for better user comfort
- Real-time search and filtering capabilities
  
### Security
- RBAC for role-based permissions and access control
- error handling and feedback
- Actvity Logs maintain logs of all the activity
  
### User Experience
- Smooth transitions between UI components
- Responsive design that works on various devices
- Error handling with contextual feedback
  
### Technical Skill
- React and Tailwind CSS for modern front-end development practices

### Additional Features
- Advanced filtering, sorting, and search functionalities for easier data management



