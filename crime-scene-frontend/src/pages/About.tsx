import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Brain, 
  Target, 
  Users, 
  Award, 
  Github, 
  Mail, 
  ExternalLink,
  CheckCircle,
  Zap
} from "lucide-react";

const About = () => {
  const technologies = [
    "Deep Learning & Neural Networks",
    "Computer Vision Algorithms",
    "Object Detection Models",
    "Image Processing Pipelines",
    "Pattern Recognition Systems",
    "Real-time Analysis Engine"
  ];

  const achievements = [
    { icon: Target, label: "95% Detection Accuracy", description: "Industry-leading precision" },
    { icon: Zap, label: "< 3 Second Analysis", description: "Lightning-fast processing" },
    { icon: Shield, label: "Forensic Grade Security", description: "Enterprise-level protection" },
    { icon: Users, label: "500+ Investigations", description: "Trusted by professionals" }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About CrimeDetect AI
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Revolutionary artificial intelligence platform designed to assist forensic 
              investigators and law enforcement agencies in analyzing crime scene evidence 
              with unprecedented accuracy and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that advanced AI technology can significantly enhance the 
                capabilities of forensic investigators and help solve crimes more efficiently. 
                Our platform combines cutting-edge machine learning with forensic science 
                to provide reliable, accurate, and fast evidence analysis.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                By automating the initial detection phase, we enable investigators to 
                focus on what matters most - building cases and ensuring justice is served.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="hero">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-card p-8 rounded-xl shadow-card">
              <h3 className="text-xl font-bold text-foreground mb-6">Core Capabilities</h3>
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced AI Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform leverages state-of-the-art artificial intelligence models 
              specifically trained on forensic datasets to identify crucial evidence 
              in crime scene photographs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-gradient-card p-6 rounded-xl shadow-card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {achievement.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI system processes crime scene images through multiple layers 
              of analysis to provide comprehensive evidence detection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Upload Image</h3>
              <p className="text-muted-foreground">
                Upload high-resolution crime scene photographs in various formats 
                including JPG, PNG, and WEBP.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our deep learning models analyze the image for blood traces, weapons, 
                and other potential evidence with high accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed analysis results with bounding boxes, confidence 
                scores, and comprehensive reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have questions about our AI detection technology or need support 
            for your investigation? We're here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              <Github className="h-5 w-5 mr-2" />
              View Documentation
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Built with cutting-edge AI technology for forensic professionals worldwide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;