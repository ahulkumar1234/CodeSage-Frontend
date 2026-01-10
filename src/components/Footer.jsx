const Footer = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        
        <h2 className="text-white font-semibold text-lg">
          CodeSage
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          AI-powered code review platform
        </p>

        <p className="text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} CodeSage. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
