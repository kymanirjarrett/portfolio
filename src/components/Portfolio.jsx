// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Code, Award, ChevronDown, Terminal, Zap, Users } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // CUSTOMIZE THIS SECTION WITH YOUR INFORMATION
  const personalInfo = {
    name: 'Kymani Jarrett',
    title: 'Software Engineer',
    tagline: 'Building exceptional digital experiences with modern web technologies',
    email: 'jarretkr@mail.uc.edu',
    github: 'https://github.com/kymanirjarrett',
    linkedin: 'https://linkedin.com/in/kymanirjarrett',
    resume: '/resume.pdf'
  };

  const aboutText = {
    intro: "I'm a passionate software engineer specializing in building robust web applications. With expertise in modern JavaScript frameworks and a strong foundation in full-stack development, I create solutions that are both functional and user-friendly.",
    background: "My journey in software development has equipped me with the ability to adapt to new technologies quickly and work effectively in collaborative environments. I'm committed to writing clean, maintainable code and following best practices.",
    interests: ['Problem Solving', 'Clean Code', 'Team Collaboration', 'Continuous Learning']
  };

  const skills = [
    { 
      category: 'Frontend', 
      icon: <Terminal className="w-6 h-6" />,
      items: ['React', 'JavaScript/TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Redux', 'React Router'] 
    },
    { 
      category: 'Backend', 
      icon: <Code className="w-6 h-6" />,
      items: ['Node.js', 'Express', 'RESTful APIs', 'PostgreSQL', 'MongoDB', 'GraphQL'] 
    },
    { 
      category: 'Tools & DevOps', 
      icon: <Zap className="w-6 h-6" />,
      items: ['Git/GitHub', 'Docker', 'Jest', 'Webpack', 'CI/CD', 'Agile/Scrum'] 
    }
  ];

  // CUSTOMIZE YOUR PROJECTS HERE - Add your real projects!
  const projects = [
    {
      title: 'Full-Stack Assessment Platform',
      description: 'Built a comprehensive assessment management system with React frontend and Node.js backend, featuring user authentication, CRUD operations, and PostgreSQL database integration. Implemented clean architecture patterns for maintainability.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Bcrypt', 'JWT'],
      github: 'https://github.com/kymanirjarrett/project1',
      demo: '#',
      highlights: ['User Authentication', 'RESTful API', 'Database Design']
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Developed a responsive admin dashboard for inventory management with real-time data visualization, advanced filtering, and role-based access control. Achieved 40% improvement in admin workflow efficiency.',
      tech: ['React', 'Redux', 'Chart.js', 'REST API', 'Material-UI'],
      github: 'https://github.com/kymanirjarrett/project2',
      demo: '#',
      highlights: ['Data Visualization', 'State Management', 'Role-Based Access']
    },
    {
      title: 'Task Management Application',
      description: 'Created a collaborative task tracking app with drag-and-drop functionality, real-time updates, and team collaboration features. Supports multiple project boards and customizable workflows.',
      tech: ['React', 'Firebase', 'Tailwind CSS', 'React DnD', 'WebSockets'],
      github: 'https://github.com/kymanirjarrett/project3',
      demo: '#',
      highlights: ['Real-Time Updates', 'Drag & Drop', 'Team Features']
    },
    {
      title: 'Weather Forecast App',
      description: 'Built a responsive weather application that displays current conditions and 7-day forecasts using external APIs. Features location-based search and favorite locations.',
      tech: ['React', 'Weather API', 'CSS Modules', 'LocalStorage'],
      github: 'https://github.com/kymanirjarrett/project4',
      demo: '#',
      highlights: ['API Integration', 'Responsive Design', 'Geolocation']
    }
  ];

  // CUSTOMIZE YOUR EXPERIENCE HERE
  const experience = [
    {
      title: 'Software Engineering Intern',
      company: 'Tech Company Inc.',
      period: 'June 2024 - Present',
      location: 'Remote',
      description: 'Developing and maintaining web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality features on schedule.',
      achievements: [
        'Implemented 15+ new features improving user engagement by 25%',
        'Reduced page load time by 40% through code optimization',
        'Participated in code reviews and mentored junior developers'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'Startup XYZ',
      period: 'Jan 2024 - May 2024',
      location: 'Hybrid',
      description: 'Built responsive user interfaces and integrated RESTful APIs. Worked in an Agile environment with bi-weekly sprints.',
      achievements: [
        'Designed and implemented 10+ reusable React components',
        'Improved accessibility score from 70 to 95',
        'Collaborated with UX team to enhance user experience'
      ]
    }
  ];

  const certifications = [
    'AWS Certified Cloud Practitioner',
    'React Developer Certification',
    'JavaScript Algorithms and Data Structures'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Resume Modal */}
      {showResumeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" 
          onClick={() => setShowResumeModal(false)}
        >
          <div 
            className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume Preview
              </h3>
              <div className="flex gap-2">
                <a
                  href={`${process.env.PUBLIC_URL}/resume.pdf`}
                  download="Kymani_Jarrett_Resume.pdf"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-semibold"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>
            {/* PDF Viewer */}
            <div className="w-full h-[calc(100%-4rem)]">
              <iframe
                src={`${process.env.PUBLIC_URL}/resume.pdf#view=FitH`}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-blue-500/10' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              {personalInfo.name}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-blue-400 transition-colors relative ${activeSection === item.toLowerCase() ? 'text-blue-400' : ''}`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="hidden md:flex space-x-4">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors hover:scale-110 transform"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-400 transition-colors hover:scale-110 transform"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${activeSection === item.toLowerCase() ? 'text-blue-400 bg-gray-800' : ''}`}
                >
                  {item}
                </button>
              ))}
              <div className="flex space-x-4 px-4 pt-2">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <Github size={20} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <Code size={48} className="text-blue-400" />
              </div>
            </div>
            <p className="text-blue-400 text-sm uppercase tracking-widest mb-4">Welcome to my portfolio</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {personalInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="mt-16 animate-bounce inline-block"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={32} className="text-blue-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <p className="text-lg text-gray-300 mb-6">
              {aboutText.intro}
            </p>
            <p className="text-lg text-gray-300 mb-8">
              {aboutText.background}
            </p>
            <div className="flex flex-wrap gap-4">
              {aboutText.interests.map((interest, index) => {
                const icons = [<Award key="award" />, <Code key="code" />, <Users key="users" />, <Terminal key="terminal" />];
                return (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/50 hover:scale-105 transition-transform">
                    {React.cloneElement(icons[index], { size: 20, className: 'text-blue-400' })}
                    <span>{interest}</span>
                  </div>
                );
              })}
            </div>
            {certifications.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Certifications</h3>
                <ul className="space-y-2">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Award size={16} className="text-purple-400" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={skillGroup.category}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-blue-400">
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">{skillGroup.category}</h3>
                </div>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-12">Here are some of my recent works</p>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                {project.highlights && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 rounded text-gray-300">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300 border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold">{exp.company}</p>
                    {exp.location && <p className="text-gray-500 text-sm">{exp.location}</p>}
                  </div>
                  <span className="text-gray-400 mt-2 md:mt-0 text-sm">{exp.period}</span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                {exp.achievements && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-blue-400 mt-1">▹</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-2xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12">
            I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              Email Me
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400/10 transition-all duration-300 hover:scale-105"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
          {personalInfo.resume && (
            <div className="mt-8">
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/80 hover:bg-gray-800 border-2 border-blue-400/50 hover:border-blue-400 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 group"
              >
                <svg className="w-6 h-6 text-blue-400 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-white">View & Download Resume</span>
                <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">© 2025 {personalInfo.name}. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Built with React & Tailwind CSS</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;