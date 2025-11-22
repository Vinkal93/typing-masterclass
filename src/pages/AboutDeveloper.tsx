import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Globe, Code2, Lightbulb, Target, Award, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const AboutDeveloper = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
            {isHindi ? "डेवलपर के बारे में" : "About the Developer"}
          </h1>

          {/* Profile Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <CardHeader className="text-center -mt-16 relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center border-4 border-background shadow-xl">
                <Code2 className="h-16 w-16 text-white" />
              </div>
              <CardTitle className="text-3xl">Vinkal Prajapati</CardTitle>
              <CardDescription className="text-lg">
                {isHindi ? "वेब डेवलपर और एंड्रॉइड ऐप डेवलपर" : "Web Developer & Android App Developer"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="mailto:vinkal93041@gmail.com" className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm truncate">vinkal93041@gmail.com</span>
                </a>
                <a href="https://quantuminstitute.framer.website" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-sm truncate">Quantum Institute</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
                <a href="https://dev.to/vinkalprajapati" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span className="text-sm truncate">Dev Profile</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </div>

              <div className="bg-accent/20 p-6 rounded-lg border">
                <p className="text-muted-foreground leading-relaxed text-justify">
                  {isHindi
                    ? "मैं विंकल प्रजापति हूं, एक passionate Web और Android Developer जो आधुनिक, responsive और intelligent डिजिटल solutions बनाने के लिए प्रतिबद्ध हूं। मेरा काम सादगी, दक्षता और उच्च गुणवत्ता वाले user experience पर केंद्रित है, यह सुनिश्चित करते हुए कि मेरे द्वारा विकसित प्रत्येक tool वास्तव में users को सीखने, बढ़ने और बेहतर प्रदर्शन करने में मदद करता है।"
                    : "I am Vinkal Prajapati, a passionate Web and Android Developer committed to creating modern, responsive, and intelligent digital solutions. My work focuses on simplicity, efficiency, and high-quality user experience, ensuring that every tool I develop genuinely helps users learn, grow, and perform better."
                  }
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://github.com/vinkalprajapati" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://linkedin.com/in/vinkalprajapati" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://twitter.com/vinkalprajapati" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  {isHindi ? "विज़न" : "Vision"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="italic text-muted-foreground">
                  {isHindi 
                    ? '"प्रौद्योगिकी को सीखने को आसान, तेज़ और अधिक सुलभ बनाना चाहिए।"'
                    : '"Technology should make learning easier, faster, and more accessible."'
                  }
                </p>
                <p className="mt-4 text-sm">
                  {isHindi
                    ? "इस विश्वास के साथ, मैंने TypeMaster बनाया, एक संपूर्ण typing training solution जो students, professionals और किसी भी व्यक्ति के लिए डिज़ाइन किया गया है जो अपनी typing speed और accuracy में सुधार करना चाहता है।"
                    : "With this belief, I built TypeMaster, a complete typing training solution designed for students, professionals, and anyone who wants to improve their typing speed and accuracy."
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-secondary" />
                  {isHindi ? "मिशन" : "Mission"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isHindi
                    ? "स्मार्ट, user-friendly और विश्वसनीय डिजिटल tools बनाना जो learners को उनके skills को बढ़ाने और excellence हासिल करने के लिए सशक्त बनाते हैं — beginner से advanced level तक।"
                    : "To build smart, user-friendly, and reliable digital tools that empower learners to enhance their skills and achieve excellence — from beginner to advanced level."
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Skills & Expertise */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-success" />
                {isHindi ? "मुख्य Skills & Expertise" : "Core Skills & Expertise"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg mb-3 text-primary">
                    {isHindi ? "तकनीकी कौशल" : "Technical Skills"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm">Android Development (Java/Kotlin)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm">Web Development (HTML, CSS, JavaScript, PHP)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm">AI Integration using Google Gemini API</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="text-sm">Excel Automation & Data Dashboards</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg mb-3 text-secondary">
                    {isHindi ? "विशेषज्ञता क्षेत्र" : "Specialization Areas"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-sm">WordPress Development</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-sm">UI/UX Designing</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-sm">Educational Software Development</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      <span className="text-sm">Typing Tools Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Major Projects */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isHindi ? "प्रमुख Projects" : "Major Projects"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">{isHindi ? "Software & Apps" : "Software & Apps"}</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Advanced Calculator App (Android)</li>
                    <li>• TypeMaster Typing Software</li>
                    <li>• Custom AI Chatbot for Websites</li>
                    <li>• Data Automation Tools for Students</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{isHindi ? "Web-Based Projects" : "Web-Based Projects"}</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• MaxxPe Landing Page</li>
                    <li>• Custom WordPress Share Widget Plugin</li>
                    <li>• Multiple Interactive Web Tools</li>
                    <li>• Dashboard Systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Philosophy */}
          <Card>
            <CardHeader>
              <CardTitle>{isHindi ? "कार्य दर्शन" : "Work Philosophy"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Clean and Minimal UI</li>
                <li>✓ Fast and Smooth User Experience</li>
                <li>✓ Real-World Problem Solving</li>
                <li>✓ Continuous Improvement and Innovation</li>
                <li>✓ User-Centric Design Approach</li>
              </ul>
              <p className="mt-6 italic text-center text-lg font-medium text-foreground">
                {isHindi 
                  ? '"अच्छा software सिर्फ बनाया नहीं जाता — इसे detail, logic और empathy के साथ तैयार किया जाता है।"'
                  : '"Good software is not just built — it is crafted with detail, logic, and empathy."'
                }
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <div className="mt-8 text-center p-6 bg-accent/10 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
              {isHindi ? "संपर्क जानकारी" : "Contact Information"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isHindi 
                ? "यदि आपके पास TypeMaster को बेहतर बनाने के लिए सुझाव, विचार या feedback हैं, तो बेझिझक संपर्क करें:"
                : "If you have suggestions, ideas, or feedback to improve TypeMaster, feel free to reach out:"
              }
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> <a href="mailto:vinkal93041@gmail.com" className="text-primary hover:underline">vinkal93041@gmail.com</a></p>
              <p><strong>Website:</strong> <a href="https://quantuminstitute.framer.website" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">quantuminstitute.framer.website</a></p>
              <p><strong>Developer Profile:</strong> <a href="https://dev.to/vinkalprajapati" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dev.to/vinkalprajapati</a></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutDeveloper;
