# 📖 OCR App  

A modern **React + TypeScript** application for extracting information from **PDF CVs**.  
The app uses **pdf.js** for text extraction and provides a clean **UI/UX** with **dark mode** and **multi-language support**.  

---
https://ocr-app-three.vercel.app/

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

##🖥️ Usage

Open the app in your browser.

Upload a PDF or image CV.

Wait for OCR to process the file.

View extracted information: Name, Email, Phone, Experience, Education, Skills, Links, and full text.

Copy the text using the Copy button.

##📂 Project Structure

src/components/OCRReader.tsx → OCR for images using Tesseract.js

src/components/CVExtractor.tsx → PDF processing, OCR, and structured info extraction

src/i18n/ → Multi-language configuration

src/styles/ → TailwindCSS theme and styles

##⚡ Future Improvements

Auto-detect CV language.

Export extracted data to JSON or CSV.

Improve regex patterns for better accuracy.

Add user authentication to save CVs.
