# WebMagic Invoice Generator

A professional, service-based invoice generator designed for digital agencies and MSMEs. Create, preview, and download beautiful invoices in seconds.

## Features

- **Live Preview**: Real-time updates as you fill out the invoice details.
- **Service-Based**: Optimized for service-based billing (no quantity field, clean layout).
- **Branded**: Custom logo and professional typography.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- **PDF Export**: High-quality PDF generation that automatically scales to fit all content.
- **Email Integration**: Quickly open your default email client with pre-filled invoice details.

## Architecture

The project is built with a modern, client-side stack:

- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast development and optimized builds.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and better developer experience.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [Shadcn UI](https://ui.shadcn.com/) for accessible, beautiful components.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent and scalable icons.
- **PDF Generation**: [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) for converting HTML elements to high-quality PDF documents.
- **Date Handling**: [date-fns](https://date-fns.org/) for easy date formatting and manipulation.

### Project Structure

- `src/components`: Reusable UI components (Form, Preview, Actions, Header).
- `src/lib`: Utility functions for calculations, formatting, and invoice generation.
- `src/types`: TypeScript interfaces for invoice data structures.
- `src/assets`: Static assets like the company logo.
- `public`: Static files including the favicon and robots.txt.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/francis-auka/webmagicwithnext-invoice.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## License

This project is private and intended for use by webmagicwithnext.
