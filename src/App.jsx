import { useState, useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Code, ScrollText, Mail, Menu, X, Link, Github, Linkedin, Shield, BadgeCheck } from 'lucide-react';
import { FaTiktok, FaThreads } from "react-icons/fa6";

// --- MOCK DATA ---
const userProfile = {
  name: "George Fredrick",
  title: "Penetration Tester",
  bio: "With a passion for cybersecurity and expertise in ethical hacking, penetration testing, digital forensics and security research I have honed my skillset continuously. With over a year in the field, I've worked on various projects focusing on API security and testing, web security, threat modelling, vulnerability assessment, network security, forensics investigations, cloud security e.t.c. In addition to this I created a platform for aspiring security researchers by fostering a community of cybersecurity professionals as a cybersecurity researcher as well as pioneering Cybersecurity Network (A community of individuals connected to the cybersecurity industry). Additionally, it is my desire to help new and inexperienced individuals break into the cybersecurity field as a commitment to ensuring a secure cyber space.",
  resumeUrl: "/resume.pdf",
  badgesUrl: "https://www.credly.com/users/fredrick-george/badges#credly",
  profileImg: "/profile.jpeg",
  heroBg: "/hero-bg.jpg",
};

const experienceData = [
  {
    company: "Cyber Secured India",
    role: "Cybersecurity Intern",
    years: "Apr 2025–Jul 2025",
    description: "Assisted with internal penetration testing, vulnerability analysis, and system hardening recommendations. Supported red team assessments against client applications and cloud infrastructures. Conducted OSINT investigations and analyzed metadata from image artifacts. Documented and reported findings using CVSS scoring and remediation best practices. Shadowed senior testers during web app testing, including SQLi, XSS, and LFI exploits. Participated in biweekly CTFs to simulate real-world adversary tactics. Using tools like  Kali Linux, Nmap, Burp Suite, Wireshark, Metasploit, Python, Google Dorking.",
    icon: <Briefcase className="w-5 h-5 text-gray-300" />,
  },
  {
    company: "Selah Tech LLC",
    role: "Cybersecurity Trainee",
    years: "Jan 2025–Present",
    description: "Developed Python automation tools for network scans, socket listeners, and result exports, incorporating programming skills critical for penetration testing. Built a network proxy and sniffer to analyze, manipulate, and reconstruct traffic, enhancing vulnerability assessment capabilities. Performed wireless capture and attack simulations, including MITM, Evil Twin, DoS, and MAC spoofing, demonstrating proficiency in applying offensive security techniques. Executed targeted exploitation and penetration tests on web applications (XSS, SQL injection, brute force), aligning methods with industry-standard vulnerability assessments.",
    icon: <Briefcase className="w-5 h-5 text-gray-300" />,
  },
];

const educationData = [
  {
    institution: "Adekunle Ajasin University, Akungba-Akoko",
    degree: "Bachelor's Degree B.A. International Relations and History",
    years: "2019 - 2024",
    details: "Specialized in International Relations and Politics. Completed final year project on 'Idanre Palace Organization'. Relevant coursework: African Politics, Historical Methodology, Pan-Africanism",
    icon: <GraduationCap className="w-5 h-5 text-gray-300" />,
  },
];

const projectData = [
  {
    title: "Darkseid - OSINT Automation Tool",
    description: "Darkseid is a powerful OSINT (Open-Source Intelligence) automation tool designed for cybersecurity professionals and ethical hackers. It extracts metadata, performs facial recognition, conducts OSINT searches, and generates PDF reports.",
    technologies: ["Kali", "Python", "GoogleAPI"],
    githubUrl: "https://github.com/PrinceGeorge00/Darkseid?tab=readme-ov-file#darkseid---osint-automation-tool",
    liveUrl: "https://github.com/PrinceGeorge00/Darkseid?tab=readme-ov-file#darkseid---osint-automation-tool",
    imgUrl: "https://placehold.co/400x200/1a1a1a/9ca3af?text=Darkseid",
  },
  {
    title: "OSINT-Lens",
    description: "OSINT-Lens is an advanced OSINT (Open Source Intelligence) automation tool designed for cybersecurity professionals, ethical hackers, and researchers. It integrates multiple OSINT techniques, including reverse image search, metadata extraction, website fingerprinting, and bulk URL analysis.",
    technologies: ["Python", "Whatweb", "Tessaract-OCR", "Google-Chrome-Driver"],
    githubUrl: "https://github.com/PrinceGeorge00/osint_lens#osint-lens",
    liveUrl: null,
    imgUrl: "https://placehold.co/400x200/1a1a1a/9ca3af?text=OSINT+Lens",
  },
];

// --- CONFIDENTIAL CLIENT / PENTEST ENGAGEMENTS ---
// Text-only cards (no links) since these involve confidential client work.
// Uses the Darkseid brand watermark instead of screenshots/reports.
const confidentialProjects = [
  {
    title: "Wabot — Breach Response & Root Cause Analysis",
    years: "2025",
    description: "Engaged by a company experiencing service downtime following a security breach to conduct a full penetration test and lead root cause analysis to determine the breach vector. Beyond identifying the entry point, the engagement focused on closing the exposure end-to-end: securing the company's Python-based automation bots, hardening API integrations, and building monitoring to catch anomalies before they became incidents.",
    impact: "Business impact: pinpointing the actual root cause meant the client could close the real gap instead of guessing, directly reducing the risk of repeat downtime, reputational damage, and further financial loss from a second breach.",
    tools: ["Python", "API Security", "Root Cause Analysis", "Log Monitoring", "Stress Testing"],
  },
  {
    title: "Nexapay — Pre-Deployment Security Assessment",
    years: "2025",
    description: "Engaged by a payment platform to penetration test their security architecture — landing page, APIs, and website — before new features shipped to production. Testing focused on catching vulnerabilities and loopholes pre-deployment, analyzing transaction patterns for fraud indicators, and supporting the rollout of stronger security protocols around sensitive financial data.",
    impact: "Business impact: for a fintech handling real transactions, an unpatched vulnerability isn't just a bug it's potential direct financial loss or regulatory exposure. Catching these issues before deployment protected both customer funds and the platform's compliance standing.",
    tools: ["Web App Pentesting", "API Security Testing", "Burp Suite", "Risk Assessment"],
  },
  {
    title: "PAYECARDS Security Assessment",
    years: "2025",
    description: "Performed a responsible penetration testing assessment on a live fintech platform as part of a recruitment challenge. Conducted passive reconnaissance, network enumeration, and web application analysis to identify security weaknesses without active exploitation, a deliberately conservative approach chosen to demonstrate sound judgment on a live production system. Findings were documented in a full security report with technical evidence, risk ratings, and remediation recommendations.",
    impact: "Business impact: demonstrated how a real-world assessment should be scoped and executed on live infrastructure without introducing risk to the business, the assessment progressed to a technical interview.",
    tools: ["Nmap", "Burp Suite", "Searchsploit", "cURL", "Kali Linux"],
  },
  {
    title: "CSI Practical Penetration Testing Lab",
    years: "2025",
    description: "Performed a full penetration test against a vulnerable lab environment as part of the Cyber Secured India internship. Conducted network reconnaissance, service enumeration, vulnerability assessment, and exploit validation, documenting every finding. Successfully identified and validated a vulnerability in an outdated dnsmasq service within the controlled training environment, following ethical hacking and responsible testing practices throughout.",
    impact: "Business impact: outdated, unpatched network services are exactly what attackers scan for at scale, this exercise reflects the kind of patch-management gap that, in a live environment, could give an attacker a foothold into internal infrastructure.",
    tools: ["Kali Linux", "Nmap", "Bettercap", "Python", "DNS", "Network Enumeration", "Vulnerability Assessment"],
  },
  {
    title: "Case Study Project",
    years: "2025",
    description: "Conducted a full penetration test against an Ubuntu web server for a confidential client engagement, exploiting a SQL injection vulnerability to gain administrative access, enumerate internal services, and identify further security weaknesses. All findings, evidence, and captured flags were documented in a professional report.",
    impact: "Business impact: SQL injection remains one of the most common and most damaging vulnerabilities in web applications, capable of exposing an entire backend database or granting attacker-level administrative control. Identifying and reporting this class of flaw before a real attacker does is directly tied to preventing data breaches and unauthorized system access.",
    tools: ["SQL Injection", "Linux Privilege Escalation", "Network Enumeration", "Report Writing"],
  },
];

const skills = [
  "Network Security", "Bash", "Python", "Red-Teaming", "Tracking", "Vulnerability Research", "Git",
  "Cloud Security (AWS/Azure)", "Cybersecurity", "Penetration Testing", "Digital Forensics",
  "API Design", "Agile Methodologies", "Kali Linux", "Docker", "OT Security",
  "API Testing"
];

// --- MAJOR CERTIFICATIONS ---
const certData = [
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    imgUrl: "/ethical_hacker_cisco.png",
    link: "/ethical_hacker_cisco.png",
  },
  {
    title: "Junior Penetration Tester",
    issuer: "TryHackMe",
    imgUrl: "https://tryhackme.com/images/pngs/certifications/cert.png",
    link: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-QGJPOIIPTT.pdf"
  },
  {
    title: "Certificate of Achievement — 92.81%",
    issuer: "Cyber Secured India",
    imgUrl: "/csi_certificate_of_achievement.png",
    link: "/csi_certificate_of_achievement.png",
  },
  {
    title: "Cyber Security and Ethical Hacking",
    issuer: "Selah Tech Academy",
    imgUrl: "/selahtechcert.jpeg",
    link: "/selahtechcert.jpeg",
  },
];

// --- COURSE CERTIFICATES ---
const courseCertData = [
  {
    title: "File Security Associate",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/1a1a1a/9ca3af?text=File+Security",
    link: "https://learn.opswatacademy.com/certifications/c40bd6b8-ced3-11ed-9469-06c0361096e5"
  },
  {
    title: "Data-Transfer Security Associate",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/1a1a1a/9ca3af?text=Data Transfer",
    link: "https://learn.opswatacademy.com/certifications/1f8ff064-ced4-11ed-b4c8-02aea812ea2d"
  },
  {
    title: "Introduction to CIP",
    issuer: "OPSWAT Academy",
    imgUrl: "https://placehold.co/300x150/1a1a1a/9ca3af?text=Critical+Infrastructure+Protection",
    link: "https://learn.opswatacademy.com/certifications/f904148a-9764-11ed-98f7-02dd896aace5"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    imgUrl: "https://placehold.co/300x150/1a1a1a/9ca3af?text=Cybersecurity",
    link: "https://www.netacad.com/certificates/?issuanceId=3b79adaf-6d0d-4def-a026-44ea3fe4957d"
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    imgUrl: "/cisco_networking_basics.png",
    link: "/cisco_networking_basics.png",
  },
  {
    title: "Cyber Job Simulation",
    issuer: "Deloitte (via Forage)",
    imgUrl: "/deloitte_forage_cyber_sim.png",
    link: "/deloitte_forage_cyber_sim.png",
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
];

// --- COMPONENTS ---

const ScrollLink = ({ to, children, setOpen }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(to);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (setOpen) setOpen(false);
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

const Card = ({ children, className = "" }) => (
  <div className={`p-6 bg-neutral-900 border border-neutral-700 rounded-lg ${className}`}>
    {children}
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["about", "experience", "education", "projects", "skills", "certifications", "contact"];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-center items-center h-16 text-gray-200">

          {/* Desktop Nav - centered */}
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
          <div className="md:hidden absolute right-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-200 hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navItems.map(item => (
              <ScrollLink key={item} to={item} setOpen={setIsOpen}>
                <span className="block px-3 py-2 rounded-md text-base font-medium capitalize text-gray-200 hover:bg-neutral-800 w-full text-center">
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

const HeroSection = ({ uploadedProfileImg, handleImageUpload }) => (
  <section
    className="relative pt-28 pb-16 min-h-screen flex items-center justify-center bg-cover bg-center"
    id="hero"
    style={{ backgroundImage: `url(${userProfile.heroBg})` }}
  >
    {/* Dark overlay so text stays readable over the photo */}
    <div className="absolute inset-0 bg-black/70"></div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <img
        src={uploadedProfileImg}
        alt="Profile"
        className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-green-500 shadow-xl mb-3"
      />

      <label className="mb-6 cursor-pointer inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <span className="text-sm text-gray-300 hover:text-green-400 transition-colors border border-gray-500 px-3 py-1 rounded-full shadow-sm">
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
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-colors flex items-center"
        >
          <ScrollText className="w-5 h-5 mr-2" /> View Resume
        </a>
        <a
          href={userProfile.badgesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border border-gray-300 text-gray-100 font-semibold rounded-full hover:bg-white/10 transition-colors flex items-center"
        >
          <BadgeCheck className="w-5 h-5 mr-2" /> View Badges
        </a>
      </div>
    </div>
  </section>
);

const SectionHeader = ({ title }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-light text-white tracking-wide">{title}</h2>
    <span className="block w-14 h-0.5 bg-green-500 mx-auto mt-3"></span>
  </div>
);

const TimelineItem = ({ data }) => (
  <Card className="mb-8">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-green-600 rounded-full text-white flex-shrink-0">
        {data.icon}
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-green-400">{data.role || data.degree}</h3>
        <p className="text-xl text-white mt-1">{data.company || data.institution}</p>
        <p className="text-sm text-gray-500 mb-3">{data.years}</p>
        <p className="text-gray-300 leading-relaxed">{data.description || data.details}</p>
      </div>
    </div>
  </Card>
);

const ProjectCard = ({ project }) => (
  <Card className="flex flex-col h-full">
    <img
      src={project.imgUrl}
      alt={project.title}
      className="w-full h-48 object-cover rounded-lg mb-4"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/1a1a1a/9ca3af?text=Project+Image" }}
    />
    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map((tech, index) => (
        <span key={index} className="px-3 py-1 text-xs font-medium text-green-300 bg-green-900/40 border border-green-800 rounded-full">
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

const ConfidentialProjectCard = ({ project }) => (
  <div className="relative overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 flex flex-col md:flex-row min-h-[320px]">
    <div
      className="w-full h-48 md:h-auto md:w-2/5 bg-cover bg-center flex-shrink-0"
      style={{ backgroundImage: "url(/Darksied-logo.jpg)" }}
    ></div>
    <div className="w-full md:w-3/5 p-6 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
      <p className="text-xs text-green-400 mb-3 uppercase tracking-wide">{project.years}</p>
      <p className="text-gray-300 text-sm leading-relaxed mb-3">{project.description}</p>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 italic">{project.impact}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tools.map((tool, i) => (
          <span key={i} className="px-3 py-1 text-xs font-medium text-green-300 bg-green-900/40 border border-green-800 rounded-full">
            {tool}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">Confidential client engagement — details available on request</span>
    </div>
  </div>
);

const CertificationCard = ({ cert }) => (
  <Card className="flex flex-col items-center text-center">
    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
      <img
        src={cert.imgUrl}
        alt={cert.title}
        className="w-full max-w-xs object-cover rounded-lg mb-4 transition transform hover:scale-[1.02]"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x150/1a1a1a/9ca3af?text=Certificate+Image" }}
      />
    </a>
    <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
    <p className="text-sm text-green-400">{cert.issuer}</p>
  </Card>
);

// alt=true gives the section a slightly lighter dark shade, for banding like the reference site
const ContentSection = ({ id, title, children, alt = false }) => (
  <section id={id} className={`py-16 border-t border-neutral-800 ${alt ? 'bg-neutral-950' : 'bg-black'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title={title} />
      {children}
    </div>
  </section>
);


// --- MAIN APP COMPONENT ---
const App = () => {
  const [uploadedProfileImg, setUploadedProfileImg] = useState(userProfile.profileImg);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans bg-black text-gray-100 min-h-screen">
      <Header />
      <main>
        <HeroSection
          uploadedProfileImg={uploadedProfileImg}
          handleImageUpload={handleImageUpload}
        />

        {/* About Section */}
        <ContentSection id="about" title="About Me">
          <Card>
            <p className="text-lg leading-relaxed text-gray-300">{userProfile.bio}</p>
          </Card>
        </ContentSection>

        {/* Experience Section */}
        <ContentSection id="experience" title="Experience" alt>
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <TimelineItem key={index} data={exp} />
            ))}
          </div>
        </ContentSection>

        {/* Education Section */}
        <ContentSection id="education" title="Education">
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <TimelineItem key={index} data={edu} />
            ))}
          </div>
        </ContentSection>

        {/* Certifications Section */}
        <ContentSection id="certifications" title="Certifications" alt>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certData.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>

          <h3 className="text-2xl font-light text-white text-center mt-16 mb-8">Course Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseCertData.map((cert, index) => (
              <CertificationCard key={index} cert={cert} />
            ))}
          </div>
        </ContentSection>

        {/* Projects Section */}
        <ContentSection id="projects" title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>

          <h3 className="text-2xl font-light text-white text-center mt-16 mb-8">Client &amp; Pentest Engagements</h3>
          <div className="grid grid-cols-1 gap-8">
            {confidentialProjects.map((project, index) => (
              <ConfidentialProjectCard key={index} project={project} />
            ))}
          </div>
        </ContentSection>

        {/* Skills Section - bordered tag boxes */}
        <ContentSection id="skills" title="Skills" alt>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium text-gray-200 bg-neutral-900 border border-neutral-600 rounded-md hover:border-green-500 hover:text-green-400 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </ContentSection>

        {/* Contact Section */}
        <ContentSection id="contact" title="Get in Touch">
          <Card className="max-w-xl mx-auto">
            <p className="text-center text-gray-400 mb-6">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <form action="https://formspree.io/f/xnngkeje" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="_replyto"
                  className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white"
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
          </Card>
        </ContentSection>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex space-x-6">
            <a href="https://github.com/PrinceGeorge00" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/george-fredrick-4b38a9375" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.tiktok.com/@prince_george001" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
              <FaTiktok className="w-6 h-6" />
            </a>
            <a href="https://www.threads.com/@prince_fredrick_george" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 transition-colors">
              <FaThreads className="w-6 h-6" />
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            Copyright © {new Date().getFullYear()} {userProfile.name}.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
