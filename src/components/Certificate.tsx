import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Award, Calendar, TrendingUp, CheckCircle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLanguage } from "@/contexts/LanguageContext";

interface CertificateProps {
  userName: string;
  examName: string;
  wpm: number;
  accuracy: number;
  date: string;
  duration: number;
  onClose?: () => void;
}

const Certificate = ({ userName, examName, wpm, accuracy, date, duration, onClose }: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { isHindi } = useLanguage();

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`typing-certificate-${examName.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return isHindi ? `${mins} मिनट ${secs} सेकंड` : `${mins} min ${secs} sec`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full bg-background p-8">
        <div ref={certificateRef} className="bg-gradient-to-br from-primary/5 via-background to-accent/5 p-12 rounded-lg border-4 border-primary/20">
          {/* Certificate Header */}
          <div className="text-center mb-8">
            <Award className="h-20 w-20 text-primary mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-primary mb-2">
              {isHindi ? "प्रमाणपत्र" : "Certificate of Achievement"}
            </h1>
            <div className="h-1 w-32 bg-primary mx-auto mb-4"></div>
            <p className="text-xl text-muted-foreground">
              {isHindi ? "टाइपिंग प्रवीणता" : "Typing Proficiency"}
            </p>
          </div>

          {/* Certificate Body */}
          <div className="text-center mb-8">
            <p className="text-lg mb-4 text-muted-foreground">
              {isHindi ? "यह प्रमाणित किया जाता है कि" : "This certifies that"}
            </p>
            <h2 className="text-4xl font-bold text-foreground mb-6 border-b-2 border-primary/30 pb-2 inline-block px-8">
              {userName || (isHindi ? "उम्मीदवार" : "Candidate")}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {isHindi 
                ? `ने सफलतापूर्वक ${examName} टाइपिंग परीक्षा उत्तीर्ण की है`
                : `has successfully passed the ${examName} Typing Examination`}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-background/80 p-4 rounded-lg border border-border">
                <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "गति" : "Speed"}</p>
                <p className="text-3xl font-bold text-success">{wpm}</p>
                <p className="text-xs text-muted-foreground">WPM</p>
              </div>
              <div className="bg-background/80 p-4 rounded-lg border border-border">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "सटीकता" : "Accuracy"}</p>
                <p className="text-3xl font-bold text-success">{accuracy}%</p>
              </div>
              <div className="bg-background/80 p-4 rounded-lg border border-border">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">{isHindi ? "समय" : "Duration"}</p>
                <p className="text-2xl font-bold text-primary">{formatDuration(duration)}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <p className="text-lg">
                {isHindi ? "जारी तिथि: " : "Issued on: "}
                {new Date(date).toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t-2 border-primary/20 pt-6 text-center">
            <p className="text-sm text-muted-foreground italic">
              {isHindi 
                ? "यह डिजिटल प्रमाणपत्र आपकी टाइपिंग दक्षता को मान्यता देता है"
                : "This digital certificate recognizes your typing proficiency"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button onClick={handleDownload} size="lg">
            <Download className="h-5 w-5 mr-2" />
            {isHindi ? "PDF डाउनलोड करें" : "Download PDF"}
          </Button>
          {onClose && (
            <Button onClick={onClose} variant="outline" size="lg">
              {isHindi ? "बंद करें" : "Close"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Certificate;
