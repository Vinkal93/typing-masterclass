import { useNavigate } from "react-router-dom";
import AdBanner from "@/components/AdBanner";

const Footer = () => {
  const navigate = useNavigate();

  const links = {
    tools: [
      { label: "Typing Test", path: "/typing-test" },
      { label: "Typing Practice", path: "/typing-practice" },
      { label: "WPM Calculator", path: "/wpm-calculator" },
      { label: "Accuracy Calculator", path: "/accuracy-calculator" },
    ],
    tests: [
      { label: "1 Minute Test", path: "/1-minute-typing-test" },
      { label: "3 Minute Test", path: "/3-minute-typing-test" },
      { label: "5 Minute Test", path: "/5-minute-typing-test" },
      { label: "Hindi Typing", path: "/hindi-typing-test" },
      { label: "English Typing", path: "/english-typing-test" },
    ],
    resources: [
      { label: "Lessons", path: "/lessons" },
      { label: "Keyboard Guide", path: "/keyboard-guide" },
      { label: "Blog", path: "/blog" },
      { label: "CPCT Mock", path: "/cpct-mock" },
    ],
    legal: [
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms & Conditions", path: "/terms-and-conditions" },
      { label: "Disclaimer", path: "/disclaimer" },
    ],
  };

  return (
    <>
      {/* Above-Footer Ad */}
      <div className="container mx-auto px-4 my-4 min-h-0">
        <AdBanner slot="1000000003" format="horizontal" />
      </div>
      <footer className="border-t border-border bg-card/30 py-8 mt-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm">Tools</h3>
              <ul className="space-y-1">
                {links.tools.map(l => (
                  <li key={l.path}>
                    <button onClick={() => navigate(l.path)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm">Tests</h3>
              <ul className="space-y-1">
                {links.tests.map(l => (
                  <li key={l.path}>
                    <button onClick={() => navigate(l.path)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm">Resources</h3>
              <ul className="space-y-1">
                {links.resources.map(l => (
                  <li key={l.path}>
                    <button onClick={() => navigate(l.path)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm">Legal</h3>
              <ul className="space-y-1">
                {links.legal.map(l => (
                  <li key={l.path}>
                    <button onClick={() => navigate(l.path)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-4 text-center">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
