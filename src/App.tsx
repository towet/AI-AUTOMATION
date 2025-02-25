import React, { useState, useEffect } from 'react';
import {
  Bot,
  Brain,
  BarChart3,
  Workflow,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Users,
  LineChart,
  Clock,
  CheckCircle,
  Target,
  BarChart,
  Rocket,
  Star,
  Calendar,
  Calculator,
  FileText,
  ChevronDown as ChevronDownIcon,
  Send,
  Lightbulb,
  RefreshCw,
  User,
  Cpu,
  Award,
  Trophy,
  ArrowUp,
  Mail,
  MessageCircle
} from 'lucide-react';
import automationBg from './assets/automation-bg.jpg';

interface Feature {
  title: string;
  description: string;
}

interface Service {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: Feature[];
  additionalInfo?: {
    useCases: string[];
    implementation: string[];
    roi: string[];
  };
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

function Modal({ 
  isOpen, 
  onClose, 
  service 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  service: Service;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-lg">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-sm sm:text-base text-cyan-400">{service.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6">
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" />
                Use Cases
              </h4>
              <ul className="grid grid-cols-1 gap-3 sm:gap-4">
                {service.additionalInfo?.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                <Workflow className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" />
                Implementation Process
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {service.additionalInfo?.implementation.map((step, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm sm:text-base">
                      {i + 1}
                    </div>
                    <p className="text-sm sm:text-base text-gray-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" />
                ROI & Benefits
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {service.additionalInfo?.roi.map((item, i) => (
                  <div key={i} className="bg-gray-900/50 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:from-cyan-500 hover:to-indigo-500 transition-all duration-300 font-semibold text-sm sm:text-base"
            >
              Get Started with {service.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const showRoiNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services: Service[] = [
    {
      icon: <Workflow className="w-16 h-16 text-cyan-500 group-hover:scale-110 transition-transform duration-500" />,
      title: "Business Process Automation",
      subtitle: "Streamline Your Operations",
      description: "Simplify complex operations with our end-to-end automation solutions designed to reduce manual tasks and improve efficiency.",
      benefits: [
        "Reduce manual tasks by 80%",
        "Streamline workflows",
        "Cut operational costs"
      ],
      features: [
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks across departments"
        },
        {
          title: "Process Streamlining",
          description: "Seamless integration with existing systems"
        }
      ],
      additionalInfo: {
        useCases: [
          "HR onboarding and documentation automation",
          "Financial reporting and reconciliation",
          "Supply chain management optimization",
          "Customer service workflow automation"
        ],
        implementation: [
          "Initial process analysis and mapping",
          "Custom automation solution design",
          "Seamless integration with existing systems",
          "Employee training and deployment"
        ],
        roi: [
          "80% reduction in processing time",
          "60% decrease in operational costs",
          "90% improvement in accuracy",
          "Rapid ROI within 6-12 months"
        ]
      }
    },
    {
      icon: <MessageSquare className="w-16 h-16 text-cyan-500 group-hover:scale-110 transition-transform duration-500" />,
      title: "AI Chatbots & Assistants",
      subtitle: "24/7 Intelligent Support",
      description: "Enhance customer engagement with AI-powered virtual assistants that work tirelessly to provide personalized support.",
      benefits: [
        "24/7 automated support",
        "90% faster responses",
        "Improved satisfaction"
      ],
      features: [
        {
          title: "Lead Generation",
          description: "Capture and qualify leads automatically"
        },
        {
          title: "Instant Support",
          description: "Real-time query resolution"
        }
      ],
      additionalInfo: {
        useCases: [
          "Customer service automation",
          "Lead qualification and nurturing",
          "Product recommendations",
          "Appointment scheduling"
        ],
        implementation: [
          "Chatbot personality design",
          "Knowledge base integration",
          "Multi-channel deployment",
          "Continuous learning setup"
        ],
        roi: [
          "70% reduction in support costs",
          "24/7 availability increases sales",
          "3x increase in lead qualification",
          "95% customer satisfaction rate"
        ]
      }
    },
    {
      icon: <Brain className="w-16 h-16 text-cyan-500 group-hover:scale-110 transition-transform duration-500" />,
      title: "Marketing Automation",
      subtitle: "Data-Driven Campaigns",
      description: "Supercharge your marketing with AI-driven strategies that deliver the right message to the right audience.",
      benefits: [
        "3x higher conversion",
        "Personalized journeys",
        "Automated content"
      ],
      features: [
        {
          title: "Campaign Automation",
          description: "Launch and optimize automatically"
        },
        {
          title: "Content Generation",
          description: "AI-powered content creation"
        }
      ],
      additionalInfo: {
        useCases: [
          "Email marketing automation",
          "Social media management",
          "Content personalization",
          "Campaign optimization"
        ],
        implementation: [
          "Marketing strategy development",
          "Channel integration setup",
          "Content automation workflow",
          "Analytics configuration"
        ],
        roi: [
          "200% increase in engagement",
          "50% reduction in campaign costs",
          "4x improvement in conversion rates",
          "Automated A/B testing results"
        ]
      }
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-cyan-500 group-hover:scale-110 transition-transform duration-500" />,
      title: "Predictive Analytics",
      subtitle: "Data-Driven Decisions",
      description: "Transform raw data into actionable insights with AI-powered analytics that help you make informed decisions.",
      benefits: [
        "95% forecast accuracy",
        "Early trend detection",
        "Risk mitigation"
      ],
      features: [
        {
          title: "Trend Forecasting",
          description: "Predict market trends"
        },
        {
          title: "Pattern Recognition",
          description: "Identify opportunities"
        }
      ],
      additionalInfo: {
        useCases: [
          "Sales forecasting",
          "Inventory optimization",
          "Risk assessment",
          "Customer behavior analysis"
        ],
        implementation: [
          "Data source integration",
          "Model development",
          "Dashboard creation",
          "Team training"
        ],
        roi: [
          "30% inventory cost reduction",
          "25% increase in sales accuracy",
          "40% better resource allocation",
          "Early risk detection savings"
        ]
      }
    }
  ];

  const stats = [
    { icon: <Target className="w-8 h-8" />, value: "99%", label: "Accuracy Rate" },
    { icon: <Users className="w-8 h-8" />, value: "10k+", label: "Clients Served" },
    { icon: <BarChart className="w-8 h-8" />, value: "85%", label: "Cost Reduction" },
    { icon: <Rocket className="w-8 h-8" />, value: "3x", label: "Faster Growth" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      image: "https://t3.ftcdn.net/jpg/06/23/19/56/360_F_623195664_2OjcC5ZK5h81Wrk3x96cjptqN8Vw00Us.jpg",
      content: "The AI automation platform has revolutionized our workflow. We've seen a 60% reduction in processing time and significantly improved accuracy.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director, GlobalTech",
      image: "https://img.freepik.com/premium-photo/happy-black-man-arms-crossed-business-portrait-corporate-motivation-company-about-us-profile-picture-smile-confident-mature-management-person-success-mindset-ceo-introduction_590464-162127.jpg",
      content: "Implementation was smooth and the results were immediate. Our team can now focus on strategic tasks while the AI handles routine operations.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Innovation, FutureCo",
      image: "https://images.pexels.com/photos/8871934/pexels-photo-8871934.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      content: "The predictive analytics feature has given us invaluable insights. We're now able to make data-driven decisions with confidence.",
      rating: 5
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50"
        style={{ 
          background: `linear-gradient(to right, #06b6d4 ${scrollProgress}%, transparent ${scrollProgress}%)` 
        }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-gray-900/90 to-gray-900/0 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img
                src="https://ideogram.ai/assets/image/lossless/response/lWw_ZnKWQv-M1k27c9xF4w"
                alt="Nova Automations"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-white">Nova Automations</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Services</a>
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Features</a>
              <a href="#testimonials" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Testimonials</a>
              <button className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200">
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '80px' }}
        >
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] space-y-8 p-4">
            <a 
              href="#services" 
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Services
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setIsMenuOpen(false)}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors duration-200"
            >
              Testimonials
            </a>
            <button className="w-full max-w-xs px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200 text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden py-20 sm:py-24">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${automationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.1)',
            animation: 'subtle-zoom 20s infinite alternate',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="relative w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-cyan-500/20 to-transparent"
                style={{
                  height: '1px',
                  width: '100%',
                  top: `${i * 5}%`,
                  left: 0,
                  animation: `slide-right ${3 + Math.random() * 2}s infinite linear`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-b from-cyan-500/20 to-transparent"
                style={{
                  width: '1px',
                  height: '100%',
                  left: `${i * 5}%`,
                  top: 0,
                  animation: `slide-down ${3 + Math.random() * 2}s infinite linear`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.2})`,
                animation: `float ${5 + Math.random() * 10}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Automate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-200">Business Growth</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-slide-right animation-delay-200">
                  Transform your business with AI-powered automation. Reduce costs, increase efficiency, and unlock new opportunities with our intelligent solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-right animation-delay-400">
                  <button 
                    onClick={() => setIsConsultModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold flex items-center justify-center group"
                  >
                    Chat with AI Expert
                    <MessageSquare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => showRoiNotification()}
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-cyan-500/50 text-cyan-400 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 text-lg font-semibold flex items-center justify-center group"
                  >
                    Calculate ROI
                    <Calculator className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              {/* Stats Preview */}
              <div className="w-full lg:w-auto grid grid-cols-2 gap-4 sm:gap-6 animate-slide-right animation-delay-600">
                {stats.slice(0, 4).map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300"
                  >
                    <div className="text-cyan-400 mb-2">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Revolutionize Your Business with AI Automation
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl">
              Transform your business operations with our cutting-edge AI automation solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Operational Consistency",
                description: "Ensure consistent, error-free operations by automating routine tasks and processes.",
                icon: <RefreshCw className="w-6 h-6" />,
                image: "https://www.nocontractvoip.com/wp-content/uploads/2022/08/automation-software-technology-process-system-business-concept-123697421.jpg"
              },
              {
                title: "24/7 Intelligent Support",
                description: "Provide round-the-clock assistance with AI-powered support systems.",
                icon: <MessageSquare className="w-6 h-6" />,
                image: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2025/02/Why-Digital-Labor-Will-Reshape-the-Enterprise-3.png"
              },
              {
                title: "Data-Driven Decision Making",
                description: "Leverage predictive analytics to forecast trends, optimize processes, and make smarter business decisions.",
                icon: <LineChart className="w-6 h-6" />,
                image: "https://cloudinary.hbs.edu/hbsit/image/upload/s--uAllk4jk--/f_auto,c_fill,h_375,w_750,/v20200101/E27A81911827B4322705AE6E63EC9E57.jpg"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/20 backdrop-blur-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20">
                        <div className="text-cyan-400">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-4">
                  <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 sm:py-32 bg-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(6,182,212,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl opacity-20 blur-lg" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Nova Automations
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <p className="leading-relaxed">
                      Founded in 2024, Nova Automations stands at the forefront of AI automation innovation. We're not just another technology company – we're pioneers in transforming how businesses operate in the digital age.
                    </p>
                    <p className="leading-relaxed">
                      Our mission is to democratize AI technology, making enterprise-grade automation accessible to businesses of all sizes. We believe that the future of work is intelligent, efficient, and human-centric.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Our Expertise</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "24/7 Intelligent Chatbot",
                      description: "Integrate AI-powered chatbots and virtual assistants that resolve customer queries instantly, handle reception, and upsell products seamlessly.",
                      icon: <MessageSquare className="w-5 h-5" />
                    },
                    {
                      title: "Marketing Automation",
                      description: "Leverage AI to create personalized marketing content and strategies based on market analysis, improving ROI on marketing efforts.",
                      icon: <Target className="w-5 h-5" />
                    },
                    {
                      title: "Workflow Automation",
                      description: "Automate repetitive tasks across departments such as HR, finance, procurement and operations.",
                      icon: <Cpu className="w-5 h-5" />
                    },
                    {
                      title: "Predictive Analytics",
                      description: "Use AI-driven predictive analytics to forecast trends and customer behavior and optimize marketing strategies and inventory management by predicting demand patterns.",
                      icon: <LineChart className="w-5 h-5" />
                    }
                  ].map((expertise, index) => (
                    <div 
                      key={index}
                      className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <div className="text-cyan-400">
                            {expertise.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">{expertise.title}</h4>
                          <p className="text-gray-300">{expertise.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 mb-4">
              Our Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive automation solutions designed to transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6 sm:mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center overflow-hidden">
                      {service.title === "Business Process Automation" && (
                        <img 
                          src="https://www.nocontractvoip.com/wp-content/uploads/2022/08/automation-software-technology-process-system-business-concept-123697421.jpg"
                          alt="Business Process Automation"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      {service.title === "AI Chatbots & Assistants" && (
                        <img 
                          src="https://www.morgan.edu/Images/News/VirtualAssistant.jpg"
                          alt="AI Chatbots & Assistants"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      {service.title === "Marketing Automation" && (
                        <img 
                          src="https://www.corefactors.in/blog/content/images/2024/06/Blog-Banner--3---1-.png"
                          alt="Marketing Automation"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      {service.title === "Predictive Analytics" && (
                        <img 
                          src="https://d3an9kf42ylj3p.cloudfront.net/uploads/2023/02/amt_machinelearningpredictiveanalytics_feb-23.jpg"
                          alt="Predictive Analytics"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                      {!["Business Process Automation", "AI Chatbots & Assistants", "Marketing Automation", "Predictive Analytics"].includes(service.title) && (
                        <div className="text-cyan-400">
                          {service.icon}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-cyan-400/90 font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300/90 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-cyan-400/90 uppercase tracking-wider flex items-center mb-4">
                      <Zap className="w-4 h-4 mr-2" />
                      Key Benefits
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {service.benefits.map((benefit, i) => (
                        <li 
                          key={i} 
                          className="flex items-start text-gray-300/90 text-sm sm:text-base"
                        >
                          <CheckCircle className="w-5 h-5 text-cyan-400/90 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-6 sm:mt-8 w-full px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 hover:from-cyan-500/20 hover:to-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/30 rounded-lg text-cyan-400 font-semibold transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.2)] text-sm sm:text-base"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              See how other businesses have transformed their operations with our AI automation solutions 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "We reduced our processing time by 75% and saved in operational costs within the first 6 months.",
                author: "Sarah ",
                position: "COO, TechCorp ",
                image: "https://t3.ftcdn.net/jpg/06/23/19/56/360_F_623195664_2OjcC5ZK5h81Wrk3x96cjptqN8Vw00Us.jpg",
                rating: 5,
                metric: "75% faster processing"
              },
              {
                quote: "The ROI was immediate. Our team now handles 3x the workload without any additional headcount.",
                author: "Michael ",
                position: "Operations Director",
                image: "https://img.freepik.com/premium-photo/happy-black-man-arms-crossed-business-portrait-corporate-motivation-company-about-us-profile-picture-smile-confident-mature-management-person-success-mindset-ceo-introduction_590464-162127.jpg",
                rating: 5,
                metric: "300% productivity boost"
              },
              {
                quote: "Their AI automation eliminated manual data entry and reduced our error rate to nearly zero.",
                author: "Emily Watson",
                position: "CFO, Finance",
                image: "https://images.pexels.com/photos/8871934/pexels-photo-8871934.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                rating: 5,
                metric: "99.9% accuracy rate"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover object-center"
                  />
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.position}</div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.quote}</p>
                <div className="bg-cyan-500/10 rounded-lg px-4 py-2 inline-block">
                  <span className="text-cyan-400 font-semibold">{testimonial.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-indigo-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-700 hover:border-cyan-500/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Join thousands of businesses that have already revolutionized their operations with our AI automation solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold flex items-center justify-center group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-gray-700/50 text-white rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-lg font-semibold flex items-center justify-center group">
                    Schedule Demo
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-2xl transform rotate-3 scale-105" />
                <div className="relative bg-gray-900/90 p-6 rounded-2xl border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-700 rounded-full w-3/4" />
                    <div className="h-4 bg-gray-700 rounded-full w-full" />
                    <div className="h-4 bg-gray-700 rounded-full w-5/6" />
                    <div className="h-4 bg-gray-700 rounded-full w-4/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Get answers to common questions about AI automation
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How quickly can we implement AI automation?",
                answer: "Most solutions can be implemented within 2-4 weeks, with some processes automated in as little as 48 hours. Our team handles the entire setup process."
              },
              {
                question: "Is AI automation secure?",
                answer: "Yes, we use bank-level encryption and comply with all major security standards including SOC 2, GDPR, and HIPAA. Your data is always protected."
              },
              {
                question: "What kind of ROI can we expect?",
                answer: "Our clients typically see ROI within 3-6 months, with cost reductions of 40-60% in automated processes. Use our ROI calculator for a custom estimate."
              },
              {
                question: "Do we need technical expertise?",
                answer: "No technical expertise is required. Our solutions are user-friendly and we provide full training and support for your team."
              },
              {
                question: "Can AI automation integrate with our existing systems?",
                answer: "Yes, our solutions integrate seamlessly with most major business systems and can be customized for proprietary software."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 overflow-hidden"
              >
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <h3 className="text-white font-semibold text-lg pr-8">{faq.question}</h3>
                  <div className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className="w-5 h-5 text-cyan-400" />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <p className="px-6 pb-4 text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Still have questions? Let's discuss your specific needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsConsultModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold flex items-center justify-center group"
              >
                Chat with AI Expert
                <MessageSquare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <img
                src="https://ideogram.ai/assets/image/lossless/response/lWw_ZnKWQv-M1k27c9xF4w"
                alt="Nova Automations"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-white">Nova Automations</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            &copy; 2025 Nova Automations. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out z-50">
          <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <Rocket className="h-5 w-5 text-cyan-300" />
            <p className="font-medium">ROI Calculator coming soon! Stay tuned for this exciting feature.</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </div>
  );
}

export default App;