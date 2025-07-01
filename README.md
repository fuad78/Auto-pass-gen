# 🔐 Password Generator App

A beautiful, modern password generator web application with stunning animations and great user experience. Developed by **Fuad Hasan**.

## ✨ Features

- 🎨 **Beautiful Modern UI** - Stunning gradient design with glassmorphism effects
- ⚡ **Real-time Generation** - Instant password generation with customizable options
- 🔒 **Strength Meter** - Visual password strength indicator
- 📋 **One-click Copy** - Copy passwords to clipboard with a single click
- 🎯 **Customizable Options** - Choose character types and password length
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎭 **Smooth Animations** - Hover effects, transitions, and particle effects
- ⌨️ **Keyboard Shortcuts** - Quick access with keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd /home/fuad/nodeapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How to Use

### Basic Usage
1. **Adjust Password Length** - Use the slider to set your desired password length (4-50 characters)
2. **Select Character Types** - Choose which character types to include:
   - ✅ Uppercase Letters (A-Z)
   - ✅ Lowercase Letters (a-z)
   - ✅ Numbers (0-9)
   - ✅ Symbols (!@#$%^&*...)
3. **Generate Password** - Click the "Generate Password" button or press Space
4. **Copy Password** - Click the copy button or use Ctrl+C when the password field is selected

### Keyboard Shortcuts
- **Space** - Generate new password
- **Ctrl/Cmd + Enter** - Generate new password
- **Ctrl/Cmd + C** - Copy password (when password field is focused)
- **Escape** - Clear password field

### Easter Eggs
- Click the title 5 times to activate "Developer Mode" with a special background effect!

## 🛠️ Technical Details

### Backend (Node.js + Express)
- **Port**: 3000
- **Framework**: Express.js
- **API Endpoint**: `/api/generate-password`
- **Password Generation**: Custom algorithm with configurable character sets

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family

### Features Implemented
- ✅ Real-time password generation
- ✅ Password strength calculation
- ✅ Copy to clipboard functionality
- ✅ Responsive design
- ✅ Smooth animations and transitions
- ✅ Hover effects
- ✅ Particle effects
- ✅ Keyboard navigation
- ✅ Loading states
- ✅ Success/error notifications

## 📁 Project Structure

```
nodeapp/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── public/               # Static files
    ├── index.html        # Main HTML page
    ├── styles.css        # CSS styles and animations
    └── script.js         # JavaScript functionality
```

## 🎨 Design Features

### Visual Elements
- **Gradient Background** - Beautiful purple-blue gradient
- **Glassmorphism Cards** - Semi-transparent cards with blur effects
- **Smooth Animations** - Fade-in, slide-up, and hover animations
- **Interactive Elements** - Buttons with ripple effects and hover states
- **Strength Meter** - Color-coded password strength indicator

### Animations
- **Page Load** - Staggered fade-in animations
- **Hover Effects** - Scale and shadow transformations
- **Button Interactions** - Ripple effects and loading states
- **Particle Effects** - Fun particle animations on password generation
- **Floating Elements** - Subtle floating animations

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `public/styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
```

### Adding New Character Sets
Modify the `generatePassword` function in `server.js`:
```javascript
// Add new character sets here
const customChars = 'your-custom-characters';
```

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start    # Standard Node.js start
```

### Environment Variables
You can customize the port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests



## 👨‍💻 Developer

**Developed by Fuad Hasan**

- 🎨 Beautiful UI/UX Design
- ⚡ Fast and Responsive
- 🔒 Secure Password Generation
- 📱 Mobile-Friendly

---

**Enjoy generating secure passwords with style! 🔐✨** 
