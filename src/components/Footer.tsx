const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TypeMaster - Developed by{" "}
          <a 
            href="https://vinkal041.hashnode.dev/vinkal-prajapati-the-visionary-developer-behind-modern-digital-innovation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            Vinkal Prajapati
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
