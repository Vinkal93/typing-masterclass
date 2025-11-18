const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TypeMaster - Developed by <span className="text-primary font-medium">Vinkal Prajapati</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
