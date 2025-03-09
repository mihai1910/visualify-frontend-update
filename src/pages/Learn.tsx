
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Calendar, BookOpen, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock curriculum data - in a real app, this would come from the backend
const mockCurriculum = {
  title: "Introduction to Machine Learning",
  chapters: [
    { id: "ch1", title: "What is Machine Learning?", duration: "25 min" },
    { id: "ch2", title: "Supervised vs Unsupervised Learning", duration: "30 min" },
    { id: "ch3", title: "Neural Networks Fundamentals", duration: "45 min" },
    { id: "ch4", title: "Training Models: Best Practices", duration: "35 min" },
    { id: "ch5", title: "Evaluating Model Performance", duration: "30 min" },
  ],
  plans: [
    { 
      id: "power", 
      name: "Power Plan", 
      description: "2 sessions of study/week", 
      duration: "2 months",
      icon: <Clock className="w-5 h-5" />
    },
    { 
      id: "balanced", 
      name: "Balanced Plan", 
      description: "1 session of study/week", 
      duration: "4 months",
      icon: <Calendar className="w-5 h-5" />
    },
    { 
      id: "busy", 
      name: "I'm Busy Plan", 
      description: "1 short session of study/week", 
      duration: "6 months",
      icon: <BookOpen className="w-5 h-5" />
    }
  ]
};

const Learn = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [curriculum, setCurriculum] = useState<typeof mockCurriculum | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, you would upload the file to your backend here
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setCurriculum(mockCurriculum);
      toast({
        title: "Success!",
        description: "Your file has been processed successfully",
      });
    }, 2000);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${mockCurriculum.plans.find(p => p.id === planId)?.name}`,
    });
  };

  const handleStartLearning = () => {
    if (!selectedPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please select a learning plan first",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to the first chapter
    navigate(`/learn/${mockCurriculum.chapters[0].id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn with Visual AI</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Upload your materials and let our AI create a personalized visual learning experience. 
                <span className="block mt-2 italic font-medium">"One picture is worth a thousand words"</span>
              </p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {!curriculum ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 border-2 border-dashed border-primary/30 rounded-xl text-center"
                >
                  <FileText className="w-12 h-12 text-primary/60 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Upload Your PDF</h2>
                  <p className="text-muted-foreground mb-6">
                    Start by uploading a PDF document. Our AI will analyze the content and create a personalized learning experience for you.
                  </p>
                  
                  <div className="mb-6">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="file-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-md cursor-pointer hover:bg-secondary/80 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </label>
                    {file && (
                      <p className="mt-2 text-sm font-medium">{file.name}</p>
                    )}
                  </div>
                  
                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || isUploading}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    {isUploading ? "Processing..." : "Process Document"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h2 className="text-2xl font-bold mb-2">{curriculum.title}</h2>
                  <p className="text-muted-foreground mb-6">
                    Your document has been processed. Choose a learning plan that fits your schedule:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {curriculum.plans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`cursor-pointer transition-all ${
                          selectedPlan === plan.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/30'
                        }`}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {plan.icon}
                            </div>
                            {selectedPlan === plan.id && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <p className="text-sm font-medium">Duration: {plan.duration}</p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Chapter Overview</h3>
                  <div className="space-y-3 mb-8">
                    {curriculum.chapters.map((chapter, index) => (
                      <div 
                        key={chapter.id}
                        className="p-4 border rounded-lg flex justify-between items-center hover:bg-secondary/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <h4 className="font-medium">{chapter.title}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">{chapter.duration}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button
                      onClick={handleStartLearning}
                      size="lg"
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      Start Learning
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
