import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-foreground" />
          <span className="font-semibold text-lg">SQL Quest</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SQL Quest. Learn SQL the fun way.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
