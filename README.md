# Code Practice Platform

A Next.js-based platform for practicing coding problems with voice assistance and AI-powered hints.

## 🚀 Features

- Interactive coding environment with Monaco Editor
- Voice command support for hands-free coding
- AI-powered hints using Gemini API
- Real-time code execution
- Problem difficulty levels (Easy, Medium, Hard)
- Test case validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API
- **Code Editor**: Monaco Editor
- **Voice Recognition**: Web Speech API
- **Styling**: Tailwind CSS

## 📦 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable React components
├── data/            # Problem data and test cases
├── lib/             # Utility functions and API clients
├── services/        # External service integrations
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-practice-platform.git
   cd code-practice-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🧪 Testing

```bash
npm run test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Tailwind CSS](https://tailwindcss.com/) 