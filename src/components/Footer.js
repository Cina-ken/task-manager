export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Task Manager. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="https://github.com" className="hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
}