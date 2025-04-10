# OpenAI Key Validator

This project is a Next.js application designed to validate OpenAI API keys. It uses the latest Next.js 15 framework and has been optimized by removing unnecessary dependencies and components.

## Features

- **Next.js 15**: Built with the latest version of Next.js for improved performance and features.
- **Tailwind CSS**: Styled using Tailwind CSS for rapid UI development.
- **Minimal Dependencies**: Reduced reliance on external libraries, including Radix-UI, to keep the project lightweight.
- **Reusable Components**: Includes essential UI components like Toast notifications.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Open-ai-key-validator
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `app/`: Contains the main application files.
- `components/ui/`: Includes reusable UI components like `toast.tsx` and `toaster.tsx`.
- `hooks/`: Custom React hooks used in the application.
- `lib/`: Utility functions.

## Removed Components

The following components were removed to streamline the project:

- Accordion
- Alert Dialog
- Alert
- And others not directly used in the application.

## Dependencies

The project uses the following key dependencies:

- `next`: ^15.0.0
- `react`: ^18.2.0
- `tailwindcss`: ^3.3.3
- `zod`: ^3.23.8

## License

This project is licensed under the MIT License.
