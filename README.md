# 📖 OCR App  

A modern **React + TypeScript** application for extracting information from **PDF CVs**.  
The app uses **pdf.js** for text extraction and provides a clean **UI/UX** with **dark mode** and **multi-language support**.  

---

## 🚀 Features  
- 📂 Upload and parse **PDF resumes**.  
- 🔍 Extracts key fields automatically:  
  - **Name**  
  - **Email**  
  - **Phone**  
  - **Experience**  
  - **Education**  
  - **Skills**  
  - **Training**  
  - **Soft Skills**  
  - **Personal Information**  
  - **Links (GitHub, LinkedIn, Portfolio, etc.)**  
- 🌙 **Dark/Light mode toggle**.  
- 🌐 **Multi-language support**:
  - `arabicExtractor` → Parses CVs written in **Arabic**.  
  - `englishExtractor` → Parses CVs written in **English**.  
- ⚡ Built with **React, TypeScript, TailwindCSS, Vite**.  

---

## 🛠️ Tech Stack  
- **Frontend:** React, TypeScript, TailwindCSS  
- **Routing:** React Router DOM  
- **PDF Processing:** [pdf.js](https://mozilla.github.io/pdf.js/)  
- **Language Parsing:** `arabicExtractor` & `englishExtractor`  
- **Icons:** react-icons (Lucide, Ionicons, FontAwesome)  
- **Build Tool:** Vite  

---

## 📦 Installation  

Clone the repository:

```bash
git clone https://github.com/your-username/ocr-app.git
cd ocr-app
