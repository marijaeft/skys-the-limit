# Sky’s The Limit – Frontend
**Version 1.0.5**

A React + Vite frontend application for **Sky’s The Limit**, a creative brand offering planners and thematic journals that inspire productivity, personal growth, and better mental health.

**Live App:** [https://www.skysthelimit.mk/](https://www.skysthelimit.mk/)

---

##  Tech Stack

- **React 19** – UI library  
- **Vite** – Fast build tool and dev server  
- **React Router v7** – Client-side routing  
- **TailwindCSS** – Utility-first CSS framework  
- **Lucide Icons & React Icons** – Icon libraries  
- **EmailJS** – Contact and order form email integration  

---

## Project Structure

```
skysthelimit/
├── public/
├── src/
│   ├── assets/
│   ├── components/        # Reusable UI components
│   ├── data/              # JSON data for products
│   ├── App.jsx            # Main app entry with routing
│   ├── main.jsx           # ReactDOM render
│   └── App.css            # Global styles
├── package-lock.json
├── package.json
├── postcss.config.js
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

##  Scripts

Run with **npm**:

- `npm run dev` – Start development server  
- `npm run build` – Build production assets  
- `npm run preview` – Preview production build locally  
- `npm run lint` – Run ESLint checks  
- `npm run vercel-build` – Build optimized for Vercel deployment  

---
## Requirements

- Node.js >= 18 (tested on v22.15.1)  
- npm >= 9 (tested on v11.4.0)

##  Setup & Installation

1. Clone the repository:

   git clone https://github.com/marijaeft/skys-the-limit.git
   cd skysthelimit

2. Install dependencies:
    
   npm install

##  Deployment

This project is optimized for deployment on **Vercel**.  
Just push the repository to GitHub and connect it to Vercel.  
It will automatically use `npm run vercel-build` for production builds.

##  Features

- Modern, responsive UI with **TailwindCSS**  
- SEO-ready with **meta tags, Open Graph, and structured data**  
- **Dynamic product pages** powered by JSON data  
- **Contact and order forms** integrated with EmailJS
- Optimized for **fast load times** with Vite  

##  Author

**Marija Eftimova** – Founder of *Sky’s The Limit*  
 Inspiring productivity and mental well-being through creative planning.

