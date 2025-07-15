import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Shield, Zap, Target, ChevronRight, CheckCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms analyze crime scene images with high accuracy."
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get detection results in seconds, not hours. Fast processing for time-critical investigations."
    },
    {
      icon: Target,
      title: "Precise Identification",
      description: "Accurately identifies blood traces, weapons, and other crucial evidence with bounding boxes."
    }
  ];

  const capabilities = [
    "Blood trace detection and analysis",
    "Weapon identification and classification",
    "Evidence pattern recognition",
    "High-resolution image processing",
    "Multi-format image support",
    "Detailed analysis reports"
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-danger/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              AI-Powered{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Crime Scene
              </span>{" "}
              Detection
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary artificial intelligence technology that analyzes crime scene images 
              to detect blood traces, weapons, and critical evidence with unprecedented accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate("/upload")}
                className="animate-pulse-glow"
              >
                <Upload className="h-5 w-5" />
                Start Analysis
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Advanced Detection Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge AI system provides forensic investigators with powerful tools 
              for evidence analysis and crime scene documentation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Comprehensive Evidence Analysis
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our AI system is trained on extensive forensic datasets to provide 
                accurate detection and analysis of various types of evidence commonly 
                found at crime scenes.
              </p>
              <div className="space-y-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-card p-8 rounded-xl shadow-card">
              <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Upload an image to see our AI detection system in action
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Analyze Evidence?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Upload your crime scene images and let our AI technology provide 
            detailed analysis and evidence detection.
          </p>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => navigate("/upload")}
            className="animate-pulse-glow"
          >
            <Upload className="h-5 w-5" />
            Start Detection Now
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;