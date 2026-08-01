import { useState, useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Code, ScrollText, Mail, Menu, X, Link, Github, Shield, BadgeCheck } from 'lucide-react';

// --- MOCK DATA ---
const userProfile = {
  // --- EDITED FOR DEMONSTRATION: Change this name to customize the portfolio's title and header ---
  name: "George Fredrick",
  title: "Penetration Tester",
  bio: "With a passion for cybersecurity and expertise in ethical hacking, penetration testing, digital forensics and security research I have honed my skillset continuously. With over a year in the field, I've worked on various projects focusing on API security and testing, web security, threat modelling, vulnerability assessment, network security, forensics investigations, cloud security e.t.c. In addition to this I created a platform for aspiring security researchers by fostering a community of cybersecurity professionals as a cybersecurity researcher as well as pioneering Cybersecurity Network (A community of individuals connected to the cybersecurity industry). Additionally, it is my desire to help new and inexperienced individuals break into the cybersecurity field as a commitment to ensuring a secure cyber space.",
  resumeUrl: "/resume.pdf", // FIX: Restored to a valid string literal.
  badgesUrl: "https://www.credly.com/users/fredrick-george/badges#credly",
  // Initial placeholder image URL
  profileImg: "/profile.jpeg",
};

const experienceData = [
  {
    company: "Cyber Secured India",
    role: "Cybersecurity Intern",
    years: "Apr 2025–Jul 2025",
    description: "Assisted with internal penetration testing, vulnerability analysis, and system hardening recommendations. Supported red team assessments against client applications and cloud infrastructures. Conducted OSINT investigations and analyzed metadata from image artifacts. Documented and reported findings using CVSS scoring and remediation best practices. Shadowed senior testers during web app testing, including SQLi, XSS, and LFI exploits. Participated in biweekly CTFs to simulate real-world adversary tactics. Using tools like  Kali Linux, Nmap, Burp Suite, Wireshark, Metasploit, Python, Google Dorking.",
    icon: <Briefcase className="w-5 h-5 text-gray-400" />,
  },
  {
    company: "Selah Tech LLC",
    role: "Cybersecurity Trainee",
    years: "Jan 2025–Present",
    description: "Developed Python automation tools for network scans, socket listeners, and result exports, incorporating programming skills critical for penetration testing. Built a network proxy and sniffer to analyze, manipulate, and reconstruct traffic, enhancing vulnerability assessment capabilities. Performed wireless capture and attack simulations, including MITM, Evil Twin, DoS, and MAC spoofing, demonstrating proficiency in applying offensive security techniques. Executed targeted exploitation and penetration tests on web applications (XSS, SQL injection, brute force), aligning methods with industry-standard vulnerability assessments.",
    icon: <Briefcase className="w-5 h-5 text-gray-400" />,
  },
];

const educationData = [
  {
    institution: "Adekunle Ajasin University, Akungba-Akoko",
    degree: "Bachelor's Degree B.A. International Relations and History",
    years: "2019 - 2024",
    // FIX: Changed inner double quotes to single quotes to prevent string termination error
    details: "Specialized in International Relations and Politics. Completed final year project on 'Idanre Palace Organization'. Relevant coursework: African Politics, Historical Methodology, Pan-Africanism",
    icon: <GraduationCap className="w-5 h-5 text-gray-400" />,
  },
];

const projectData = [
  {
    title: "Darkseid - OSINT Automation Tool",
    description: "Darkseid is a powerful OSINT (Open-Source Intelligence) automation tool designed for cybersecurity professionals and ethical hackers. It extracts metadata, performs facial recognition, conducts OSINT searches, and generates PDF reports.",
    technologies: ["Kali", "Python", "GoogleAPI"],
    githubUrl: "https://github.com/PrinceGeorge00/Darkseid?tab=readme-ov-file#darkseid---osint-automation-tool",
    liveUrl: "https://github.com/PrinceGeorge00/Darkseid?tab=readme-ov-file#darkseid---osint-automation-tool",
    imgUrl: "https://placehold.co/400x200/374151/d1d5db?text=Darkseid",
  },
  {
    title: "OSINT-Lens",
    description: "OSINT-Lens is an advanced OSINT (Open Source Intelligence) automation tool designed for cybersecurity professionals, ethical hackers, and researchers. It integrates multiple OSINT techniques, including reverse image search, metadata extraction, website fingerprinting, and bulk URL analysis.",
    technologies: ["Python", "Whatweb", "Tessaract-OCR", "Google-Chrome-Driver"],
    githubUrl: "https://github.com/PrinceGeorge00/osint_lens#osint-lens",
    liveUrl: null,
    imgUrl: "https://placehold.co/400x200/374151/d1d5db?text=OSINT+Lens",
  },
];

const skills = [
  "Network Security", "Bash", "Python", "Red-Teaming", "Tracking", "Vulnerability Research", "Git",
  "Cloud Security (AWS/Azure)", "Cybersecurity", "Penetration Testing", "Digital Forensics",
  "API Design", "Agile Methodologies", "Kali Linux", "Docker", "OT Security",
  "API Testing"
];

const certData = [
  {
    title: "Junior Penetration Tester",
    issuer: "TryHackMe",
    imgUrl: "https://tryhackme.com/images/pngs/certifications/cert.png",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-QGJPOIIPTT.pdf"
  },
  {
    title: "File Security Associate",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/065f46/d1d5db?text=File+Security",
    link: "https://learn.opswatacademy.com/certifications/c40bd6b8-ced3-11ed-9469-06c0361096e5"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    imgUrl: "https://placehold.co/300x150/065f46/d1d5db?text=Cybersecurity",
    link: "https://www.netacad.com/certificates/?issuanceId=3b79adaf-6d0d-4def-a026-44ea3fe4957d"
  },
  {
    title: "Introduction to CIP",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/065f46/d1d5db?text=Critical+Infrastructure+Protection",
    link: "https://learn.opswatacademy.com/certifications/f904148a-9764-11ed-98f7-02dd896aace5"
  },
  {
    title: "Data-Transfer Security Associate",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/065f46/d1d5db?text=Data Transfer",
    link: "https://learn.opswatacademy.com/certifications/1f8ff064-ced4-11ed-b4c8-02aea812ea2d"
  },
  {
    title: "Cybersecurity and Digital Forensics Intern",
    issuer: "Cyber Secured India",
    imgUrl: "/georgefredrickcertificateofcompletion.png",
    link: "/georgefredrickcertificateofcompletion.pdf"
  },
  {
    title: "Resume and Brand Mastery",
    issuer: "Oeson",
    imgUrl: "/oesoncertificate.png",
    link: "/oesoncertificate.pdf"
  },
  {
    title: "Hack The Box Certified Ethical Hacker",
    issuer: "Hack The Box (Mock)",
    imgUrl: "https://placehold.co/300x150/065f46/d1d5db?text=HTB+CPTS",
    link: "#"
  },
];

// --- COMPONENTS ---

// Custom Scroll Link component
const ScrollLink = ({ to, children, setOpen }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(to);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (setOpen) setOpen(false); // Close mobile menu
  };

  return (
    <a
      href={`#${to}`}
      onClick={handleClick}
      className="p-2 transition-colors duration-200 hover:text-green-400"
    >
      {children}
    </a>
  );
};

// Simple reusable card wrapper
const Card = ({ children, className = "" }) => (
  <div className={`p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-green-500/30 transition-shadow ${className}`}>
    {children}
  </div>
);

// Header/Navigation Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["about", "experience", "education", "projects", "skills", "certifications", "contact"];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold text-green-400">
            {/* The first word of the name + Portfolio is used here */}
            {userProfile.name.split(' ')[0]} Portfolio
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="flex space-x-4">
              {navItems.map(item => (
                <ScrollLink key={item} to={item}>
                  <span className="capitalize">{item}</span>
                </ScrollLink>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
            {navItems.map(item => (
              <ScrollLink key={item} to={item} setOpen={setIsOpen}>
                <span className="block px-3 py-2 rounded-md text-base font-medium capitalize text-gray-300 hover:bg-gray-700 w-full text-left">
                  {item}
                </span>
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Hero Section
// Now accepts props for the image and handler
const HeroSection = ({ uploadedProfileImg, handleImageUpload }) => (
  <section className="pt-28 pb-16 bg-gray-900 min-h-screen flex items-center justify-center" id="hero">
    <div className="max-w-4xl mx-auto px-4 text-center">
      {/* Profile Image */}
      <img
        src={uploadedProfileImg}
        alt="Profile"
        className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-green-500 shadow-xl mb-3"
      />

      {/* Image Upload/Change Button */}
      <label className="mb-6 cursor-pointer inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <span className="text-sm text-gray-400 hover:text-green-400 transition-colors border border-gray-600 px-3 py-1 rounded-full shadow-md">
            {uploadedProfileImg.startsWith('data:image') ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </span>
      </label>


      <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-2 tracking-tight">
        {userProfile.name}
      </h1>
      <h2 className="text-2xl sm:text-4xl font-light text-green-400 mb-8">
        {userProfile.title}
      </h2>
      <div className="flex justify-center space-x-4">
        <a
          href={userProfile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors flex items-center"
        >
          <ScrollText className="w-5 h-5 mr-2" /> View Resume
        </a>
        <a
          href={userProfile.badgesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-700 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <BadgeCheck className="w-5 h-5 mr-2" /> View Badges
        </a>
      </div>
    </div>
  </section>
);

// Section Header Component
const SectionHeader = ({ title, icon: Icon }) => (
  <h2 className="text-4xl font-bold text-white mb-10 border-b-2 border-green-500 pb-2 flex items-center">
    {Icon && <Icon className="w-8 h-8 text-green-400 mr-3" />}
    {title}
  </h2>
);

// Timeline Item
const TimelineItem = ({ data }) => (
  <Card className="mb-8">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-green-500 rounded-full text-gray-900 flex-shrink-0">
        {data.icon}
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-green-400">{data.role || data.degree}</h3>
        <p className="text-xl text-white mt-1">{data.company || data.institution}</p>
        <p className="text-sm text-gray-400 mb-3">{data.years}</p>
        <p className="text-gray-300 leading-relaxed">{data.description || data.details}</p>
      </div>
    </div>
  </Card>
);

// Project Card
const ProjectCard = ({ project }) => (
  <Card className="flex flex-col h-full">
    <img
      src={project.imgUrl}
      alt={project.title}
      className="w-full h-48 object-cover rounded-lg mb-4"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/374151/d1d5db?text=Project+Image" }}
    />
    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map((tech, index) => (
        <span key={index} className="px-3 py-1 text-xs font-medium text-green-300 bg-green-800 rounded-full">
          {tech}
        </span>
      ))}
    </div>
    <div className="mt-auto flex space-x-3">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
      >
        <Github className="w-5 h-5 mr-1" /> GitHub
      </a>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-green-400 transition-colors flex items-center"
        >
          <Link className="w-5 h-5 mr-1" /> Live Demo
        </a>
      )}
    </div>
  </Card>
);

// Certification Card
const CertificationCard = ({ cert }) => (
  <Card className="flex flex-col items-center text-center">
    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
      <img
        src={cert.imgUrl}
        alt={cert.title}
        className="w-full max-w-xs object-cover rounded-lg mb-4 transition transform hover:scale-[1.02]"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x150/374151/d1d5db?text=Certificate+Image" }}
      />
    </a>
    <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
    <p className="text-sm text-green-400">{cert.issuer}</p>
  </Card>
);

// Main Content Section Layout
const ContentSection = ({ id, title, icon, children }) => (
  <section id={id} className="py-16 bg-gray-900 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title={title} icon={icon} />
      {children}
    </div>
  </section>
);


// --- MAIN APP COMPONENT ---
const App = () => {
  // State to hold the profile image. Initialize with the placeholder URL.
  const [uploadedProfileImg, setUploadedProfileImg] = useState(userProfile.profileImg);
  
  // Handler for file input change
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // When the file loads, set the result (Base64 string) to state
      reader.onloadend = () => {
        setUploadedProfileImg(reader.result);
      };
      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans bg-gray-900 text-gray-100 min-h-screen">
      <Header />
      <main>
        {/* Pass the state and handler to HeroSection */}
        <HeroSection
          uploadedProfileImg={uploadedProfileImg}
          handleImageUpload={handleImageUpload}
        />

        {/* About Section */}
        <ContentSection id="about" title="About Me" icon={ScrollText}>
          <Card>
            <p className="text-lg leading-relaxed">{userProfile.bio}</p>
          </Card>
        </ContentSection>

        {/* Experience Section */}
        <ContentSection id="experience" title="Experience" icon={Briefcase}>
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <TimelineItem key={index} data={exp} />
            ))}
          </div>
        </ContentSection>

        {/* Education Section */}
        <ContentSection id="education" title="Education" icon={GraduationCap}>
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <TimelineItem key={index} data={edu} />
            ))}
          </div>
        </ContentSection>

        {/* Certifications Section */}
        <ContentSection id="certifications" title="Certifications" icon={BadgeCheck}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certData.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8 italic">
            Check back soon for more certifications and course certificates!
          </p>
        </ContentSection>

        {/* Projects Section */}
        <ContentSection id="projects" title="Projects" icon={Code}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </ContentSection>

        {/* Skills Section */}
        <ContentSection id="skills" title="Skills" icon={Shield}>
          <Card>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition-colors cursor-pointer">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </ContentSection>

        {/* Contact Section */}
        <ContentSection id="contact" title="Get in Touch" icon={Mail}>
          <Card className="max-w-xl mx-auto">
            <p className="text-center text-gray-300 mb-6">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            {/* FORM UPDATED WITH USER'S SPECIFIC FORMSPREE ENDPOINT */}
            <form action="https://formspree.io/f/xnngkeje" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name" // Added name attribute for submission
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="_replyto" // Formspree uses _replyto to set the sender's email
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message" // Added name attribute for submission
                  rows="4"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="Let's build something amazing together..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>
            <p className="text-xs text-center text-gray-500 mt-4">
              Note: This form is now fully configured for submission via Formspree.
            </p>
          </Card>
        </ContentSection>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          Copyright © {new Date().getFullYear()} {userProfile.name}. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
};

export default App;
