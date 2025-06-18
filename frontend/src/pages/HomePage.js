import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../contexts/AppContext';
import ProjectCard from '../components/ProjectCard';

const HomePage = () => {
  const { user, isSignedIn } = useUser();
  const { fetchProjects, loading } = useApp();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [stats, setStats] = useState({ projects: 0, developers: 0, collaborations: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c943?w=150&h=150&fit=crop&crop=face",
      text: "H@ckollab helped me find the perfect team for my startup. The collaboration tools are incredible!"
    },
    {
      name: "Marcus Rodriguez",
      role: "AI Engineer",
      company: "DeepMind",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "The quality of developers here is exceptional. I've learned so much from my collaborations."
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "Building projects here accelerated my career. The community is supportive and innovative."
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-400' },
    { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-orange-400' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-indigo-500' },
    { name: 'AI/ML', icon: '🤖', color: 'from-purple-400 to-pink-400' },
    { name: 'Blockchain', icon: '⛓️', color: 'from-orange-400 to-red-400' },
  ];

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const allProjects = await fetchProjects({ featured: true, limit: 6 });
        setFeaturedProjects(allProjects || []);
      } catch (error) {
        console.error('Failed to load featured projects:', error);
      }
    };

    loadFeaturedProjects();

    // Animate stats
    const animateStats = () => {
      const targetStats = { projects: 1247, developers: 3894, collaborations: 8265 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
          return;
        }

        const progress = currentStep / steps;
        setStats({
          projects: Math.floor(targetStats.projects * progress),
          developers: Math.floor(targetStats.developers * progress),
          collaborations: Math.floor(targetStats.collaborations * progress),
        });
        currentStep++;
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, [fetchProjects]);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-32 px-4">
        <div className="container-modern text-center">
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
                animate="bounce-gentle"
              ></div>
            ))}
          </div>

          <div className="relative z-10 animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-semibold text-primary-700 border border-primary-200">
                🚀 The Future of Developer Collaboration
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Welcome to{' '}
              <span className="relative">
                <span className="text-gradient bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                  H@ckollab
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/20 to-accent-600/20 blur-lg rounded-lg -z-10"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {isSignedIn 
                ? (
                  <span className="animate-slide-in-left">
                    Welcome back, <strong className="text-gradient">{user?.firstName}</strong>! 
                    Ready to collaborate on amazing projects and shape the future of technology?
                  </span>
                )
                : (
                  <span className="animate-slide-in-right">
                    Connect with <strong>elite developers</strong>, build <strong>revolutionary projects</strong>, 
                    and transform your ideas into reality through the power of collaboration.
                  </span>
                )
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animate-delay-300">
              {isSignedIn ? (
                <>
                  <Link 
                    to="/explore" 
                    className="group btn-primary text-lg px-8 py-4 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Explore Developers
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link 
                    to="/create-project" 
                    className="group btn-secondary text-lg px-8 py-4 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Project
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/sign-up" 
                    className="group btn-primary text-lg px-8 py-4 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Started Free
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link 
                    to="/explore" 
                    className="group btn-secondary text-lg px-8 py-4"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Browse Developers
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-500">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">
                  {stats.projects.toLocaleString()}+
                </div>
                <div className="text-sm text-secondary-600 font-medium">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">
                  {stats.developers.toLocaleString()}+
                </div>
                <div className="text-sm text-secondary-600 font-medium">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">
                  {stats.collaborations.toLocaleString()}+
                </div>
                <div className="text-sm text-secondary-600 font-medium">Collaborations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding relative">
        <div className="container-modern">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-2xl"></div>
          </div>

          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-semibold text-primary-700 border border-primary-200 mb-6">
              ✨ Why Choose H@ckollab?
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Build the <span className="text-gradient">Future</span> Together
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Join a revolutionary platform designed for ambitious developers who want to create, 
              collaborate, and innovate at the highest level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card-premium p-8 text-center group hover-lift animate-fade-in-up delay-100">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-gradient transition-all duration-300">
                AI-Powered Matching
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Our advanced AI analyzes your skills, preferences, and project requirements to find perfect team matches and collaboration opportunities.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                {['React', 'AI/ML', 'TypeScript'].map((tech, i) => (
                  <span key={tech} className={`badge-gradient text-xs delay-${(i + 1) * 100}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-premium p-8 text-center group hover-lift animate-fade-in-up delay-200">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-glow-success transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-success-400 to-success-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs">🚀</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-gradient transition-all duration-300">
                Real-time Collaboration
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Built-in code sharing, live communication tools, and project management features that keep your team synchronized and productive.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                {['WebRTC', 'Git', 'Slack'].map((tech, i) => (
                  <span key={tech} className={`badge-gradient text-xs delay-${(i + 1) * 100}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card-premium p-8 text-center group hover-lift animate-fade-in-up delay-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-glow-accent transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-warning-400 to-warning-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⭐</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-gradient transition-all duration-300">
                Career Acceleration
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                Build an impressive portfolio, gain mentorship from industry experts, and access exclusive opportunities that fast-track your career growth.
              </p>
              <div className="mt-6 flex items-center justify-center space-x-2">
                {['Portfolio', 'Mentorship', 'Jobs'].map((tech, i) => (
                  <span key={tech} className={`badge-gradient text-xs delay-${(i + 1) * 100}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Showcase */}
          <div className="card-premium p-8 text-center animate-fade-in-up delay-400">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Built with <span className="text-gradient">Cutting-edge</span> Technologies
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group card-interactive p-4 bg-gradient-to-br ${tech.color} text-white min-w-[120px] hover:scale-110 transform transition-all duration-300 delay-${index * 50}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{tech.icon}</div>
                  <div className="font-semibold text-sm">{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-50/50 via-primary-50/30 to-accent-50/50 relative">
        <div className="container-modern">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-dot-pattern opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-primary-200/20 to-accent-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 animate-fade-in-up">
              <div>
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-100 to-primary-100 rounded-full text-sm font-semibold text-accent-700 border border-accent-200 mb-4">
                  🔥 Featured Projects
                </span>
                <h2 className="text-4xl md:text-5xl font-black">
                  Discover <span className="text-gradient">Amazing</span> Projects
                </h2>
                <p className="text-xl text-secondary-600 mt-4 max-w-2xl">
                  Explore innovative projects built by our community of talented developers. 
                  Get inspired and find your next collaboration opportunity.
                </p>
              </div>
              <Link 
                to="/explore" 
                className="group btn-cosmic mt-6 md:mt-0 flex items-center"
              >
                <span>Explore All</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-modern p-6 animate-pulse">
                    <div className="skeleton h-48 mb-4 rounded-xl"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text w-3/4"></div>
                    <div className="flex space-x-2 mt-4">
                      <div className="skeleton w-16 h-6 rounded-full"></div>
                      <div className="skeleton w-20 h-6 rounded-full"></div>
                      <div className="skeleton w-14 h-6 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in-up">
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-sm">✨</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                  No Featured Projects Yet
                </h3>
                <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto">
                  Be the first to create an amazing project that could be featured here!
                </p>
                {isSignedIn && (
                  <Link 
                    to="/create-project" 
                    className="btn-premium inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create the First Project
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-modern">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-50/50 via-transparent to-accent-50/50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-200/20 to-accent-200/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center mb-16 animate-fade-in-up">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-success-100 to-primary-100 rounded-full text-sm font-semibold text-success-700 border border-success-200 mb-6">
              💬 What Our Community Says
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Loved by <span className="text-gradient">Developers</span> Worldwide
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Join thousands of developers who have transformed their careers and built incredible projects through H@ckollab.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="card-premium p-12 text-center animate-fade-in-up delay-200">
              <div className="flex items-center justify-center mb-8">
                <div className="flex -space-x-2">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`relative transition-all duration-500 ${
                        index === currentTestimonial 
                          ? 'scale-125 z-20' 
                          : index === (currentTestimonial + 1) % testimonials.length || 
                            index === (currentTestimonial - 1 + testimonials.length) % testimonials.length
                          ? 'scale-110 z-10 opacity-75'
                          : 'scale-95 opacity-50'
                      }`}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-medium object-cover"
                      />
                      {index === currentTestimonial && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-success-400 to-success-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-40 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      index === currentTestimonial 
                        ? 'opacity-100 translate-x-0' 
                        : index < currentTestimonial 
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <blockquote className="text-xl md:text-2xl text-secondary-700 font-medium leading-relaxed mb-6">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <div>
                        <div className="font-bold text-secondary-900 text-lg">{testimonial.name}</div>
                        <div className="text-secondary-600">{testimonial.role} at {testimonial.company}</div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-warning-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-125' 
                        : 'bg-secondary-300 hover:bg-secondary-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isSignedIn && (
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-cosmic"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="container-modern relative z-10 text-center text-white">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 mb-8">
                🚀 Ready to Transform Your Career?
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Join the <span className="text-white drop-shadow-lg">Future</span> of
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Developer Collaboration
                </span>
              </h2>
              <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Connect with elite developers, build revolutionary projects, and accelerate your career 
                in the most innovative development community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link 
                  to="/sign-up" 
                  className="group btn-premium text-xl px-12 py-6 bg-white text-secondary-900 hover:bg-white/95 shadow-ultra hover:shadow-glow-lg relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started Free
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-accent-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/explore" 
                  className="group text-xl px-8 py-4 text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Explore Community
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white drop-shadow-lg">
                    {stats.projects.toLocaleString()}+
                  </div>
                  <div className="text-white/80 font-medium">Active Projects</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white drop-shadow-lg">
                    {stats.developers.toLocaleString()}+
                  </div>
                  <div className="text-white/80 font-medium">Elite Developers</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-2 text-white drop-shadow-lg">
                    {stats.collaborations.toLocaleString()}+
                  </div>
                  <div className="text-white/80 font-medium">Success Stories</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
