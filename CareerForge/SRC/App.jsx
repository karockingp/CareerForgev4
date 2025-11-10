import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Lightbulb,
  Clock,
  Building,
  Search,
  Download,
  Check,
  Plus,
  X
} from "lucide-react";

interface ResumeSuggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  original: string;
  improved: string;
}

interface JobTrial {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  category: string;
  status: "available" | "in-progress" | "completed";
}

const mockJobTrials = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    duration: "3 months",
    description: "Work on React applications and collaborate with design teams to build user interfaces.",
    skills: ["React", "JavaScript", "CSS"],
    category: "Technology",
    status: "available"
  },
  {
    id: "2",
    title: "Marketing Analyst",
    company: "GrowthInc",
    duration: "2 months",
    description: "Analyze campaign performance and create data visualizations for marketing strategies.",
    skills: ["Analytics", "Data Visualization", "Marketing"],
    category: "Marketing",
    status: "in-progress"
  },
  {
    id: "3",
    title: "UX Research Assistant",
    company: "DesignStudio",
    duration: "1 month",
    description: "Conduct user interviews and help with usability testing for new products.",
    skills: ["User Research", "UX Design", "Interviewing"],
    category: "Design",
    status: "available"
  },
  {
    id: "4",
    title: "Content Writer",
    company: "MediaGroup",
    duration: "4 weeks",
    description: "Create blog posts and social media content for tech products.",
    skills: ["Writing", "Content Creation", "SEO"],
    category: "Content",
    status: "completed"
  },
  {
    id: "5",
    title: "Data Science Apprentice",
    company: "DataSystems",
    duration: "6 weeks",
    description: "Learn data analysis techniques and work on real-world datasets.",
    skills: ["Python", "Data Analysis", "Statistics"],
    category: "Technology",
    status: "available"
  },
  {
    id: "6",
    title: "Product Management Associate",
    company: "InnovateCo",
    duration: "8 weeks",
    description: "Support product managers in roadmap planning and feature prioritization.",
    skills: ["Product Strategy", "Agile", "Communication"],
    category: "Business",
    status: "available"
  }
];

const mockSuggestions = [
  {
    id: "1",
    category: "Keywords",
    title: "Add industry-specific keywords",
    description: "Your resume is missing keywords relevant to software engineering roles.",
    original: "Worked on web applications",
    improved: "Developed scalable web applications using React and Node.js"
  },
  {
    id: "2",
    category: "Structure",
    title: "Improve bullet point structure",
    description: "Use action verbs and quantify achievements for better impact.",
    original: "Responsible for maintaining company website",
    improved: "Maintained company website, improving load times by 40%"
  },
  {
    id: "3",
    category: "Impact",
    title: "Quantify achievements",
    description: "Add metrics to demonstrate the impact of your work.",
    original: "Led a team of developers",
    improved: "Led a team of 5 developers to deliver projects 20% ahead of schedule"
  }
];

const skillOptions = [
  "React", "JavaScript", "Python", "Data Analysis", "UX Design",
  "Marketing", "Content Writing", "Project Management", "UI Design",
  "Node.js", "SQL", "Machine Learning", "SEO", "Agile", "Communication"
];

export default function CareerForge() {
  const [activeTab, setActiveTab] = useState("career-lens");
  const [resumeText, setResumeText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrials, setFilteredTrials] = useState(mockJobTrials);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let result = mockJobTrials;

    if (selectedSkills.length > 0) {
      result = result.filter(trial =>
        selectedSkills.some(skill =>
          trial.skills.includes(skill)
        )
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(trial =>
        trial.title.toLowerCase().includes(term) ||
        trial.company.toLowerCase().includes(term) ||
        trial.description.toLowerCase().includes(term) ||
        trial.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }

    setFilteredTrials(result);
  }, [selectedSkills, searchTerm]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        setResumeText(content);
        setSuggestions(mockSuggestions);
        setIsProcessing(false);
      };
      reader.readAsText(file);
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const applySuggestion = (id) => {
    setSuggestions(suggestions.filter(s => s.id !== id));
  };

  const applyAllSuggestions = () => {
    setSuggestions([]);
  };

  const downloadImprovedResume = () => {
    alert("Improved resume downloaded!");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #f3f4f6, #e5e7eb)" }}>
      {/* Header */}
      <header style={{ background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ background: "#2563eb", width: "32px", height: "32px", borderRadius: "8px" }}></div>
              <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#111827" }}>CareerForge</h1>
            </div>

            <nav style={{ display: "flex", gap: "0.25rem" }}>
              <button
                onClick={() => setActiveTab("career-lens")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: activeTab === "career-lens" ? "#2563eb" : "transparent",
                  color: activeTab === "career-lens" ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                <FileText size={18} />
                <span>CareerLens</span>
              </button>
              <button
                onClick={() => setActiveTab("try-path")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: activeTab === "try-path" ? "#2563eb" : "transparent",
                  color: activeTab === "try-path" ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                <Search size={18} />
                <span>TryPath</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {activeTab === "career-lens" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>CareerLens</h2>
              <p style={{ marginTop: "0.5rem", color: "#4b5563" }}>
                Upload your resume and get AI-powered suggestions to improve it
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {/* Upload Section */}
              <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <Upload size={20} /> Upload Your Resume
                </h3>

                {resumeText ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      style={{
                        minHeight: "300px",
                        padding: "0.75rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        fontFamily: "monospace",
                        fontSize: "14px"
                      }}
                    />
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={triggerFileInput}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "500"
                        }}
                      >
                        Replace Resume
                      </button>
                      <button
                        onClick={() => {
                          setResumeText("");
                          setSuggestions([]);
                        }}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "500"
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={triggerFileInput}
                    style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "2rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "border-color 0.3s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#60a5fa")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
                  >
                    <Upload size={48} style={{ margin: "0 auto", color: "#9ca3af" }} />
                    <p style={{ marginTop: "0.5rem", fontSize: "14px", color: "#4b5563" }}>
                      <span style={{ fontWeight: "500", color: "#2563eb" }}>Click to upload</span> or drag and drop
                    </p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>PDF, DOC, or TXT (max 5MB)</p>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx,.txt"
                />

                {isProcessing && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "2rem" }}>
                    <div style={{
                      animation: "spin 1s linear infinite",
                      width: "40px",
                      height: "40px",
                      border: "4px solid #e5e7eb",
                      borderTop: "4px solid #2563eb",
                      borderRadius: "50%"
                    }}></div>
                    <span style={{ marginLeft: "0.75rem", color: "#4b5563" }}>Analyzing your resume...</span>
                  </div>
                )}
              </div>

              {/* Suggestions Section */}
              <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <Lightbulb size={20} /> AI Suggestions
                </h3>

                {suggestions.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={applyAllSuggestions}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "500"
                        }}
                      >
                        Apply All Suggestions
                      </button>
                      <button
                        onClick={downloadImprovedResume}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem"
                        }}
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>

                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          style={{
                            border: "1px solid #e5e7eb",
                            borderLeft: "4px solid #2563eb",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                            <div>
                              <span style={{
                                display: "inline-block",
                                padding: "0.25rem 0.75rem",
                                background: "#e5e7eb",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "500",
                                marginBottom: "0.5rem"
                              }}>
                                {suggestion.category}
                              </span>
                              <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{suggestion.title}</h4>
                              <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "0.75rem" }}>
                                {suggestion.description}
                              </p>

                              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <div>
                                  <p style={{ fontSize: "12px", color: "#6b7280" }}>Original:</p>
                                  <p style={{ fontSize: "14px", background: "#f3f4f6", padding: "0.5rem", borderRadius: "4px" }}>
                                    {suggestion.original}
                                  </p>
                                </div>
                                <div>
                                  <p style={{ fontSize: "12px", color: "#6b7280" }}>Suggested:</p>
                                  <p style={{ fontSize: "14px", background: "#eff6ff", padding: "0.5rem", borderRadius: "4px", border: "1px solid #bfdbfe" }}>
                                    {suggestion.improved}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => applySuggestion(suggestion.id)}
                              style={{
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "6px",
                                padding: "0.5rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center"
                              }}
                            >
                              <Check size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : resumeText ? (
                  <div style={{ textAlign: "center", paddingTop: "2rem" }}>
                    <Lightbulb size={48} style={{ margin: "0 auto", color: "#fbbf24" }} />
                    <h4 style={{ marginTop: "1rem", fontWeight: "500" }}>No suggestions found</h4>
                    <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "0.5rem" }}>
                      Your resume looks great! We didn't find any areas for improvement.
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", paddingTop: "2rem" }}>
                    <FileText size={48} style={{ margin: "0 auto", color: "#d1d5db" }} />
                    <h4 style={{ marginTop: "1rem", fontWeight: "500" }}>Upload your resume to get started</h4>
                    <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "0.5rem" }}>
                      We'll analyze your resume and provide personalized suggestions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "try-path" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>TryPath</h2>
              <p style={{ marginTop: "0.5rem", color: "#4b5563" }}>
                Discover job trials based on your skills and interests
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "1.5rem" }}>
              {/* Filters */}
              <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", height: "fit-content" }}>
                <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Filters</h3>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ fontWeight: "500", marginBottom: "0.5rem" }}>Skills</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          padding: "0.25rem 0.75rem",
                          background: "#e5e7eb",
                          borderRadius: "20px",
                          fontSize: "13px"
                        }}
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0"
                          }}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      marginBottom: "0.5rem",
                      fontSize: "14px"
                    }}
                  />
                  <div style={{ maxHeight: "160px", overflowY: "auto", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "0.5rem" }}>
                    {skillOptions
                      .filter(skill =>
                        skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !selectedSkills.includes(skill)
                      )
                      .map((skill) => (
                        <div
                          key={skill}
                          onClick={() => addSkill(skill)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5rem",
                            cursor: "pointer",
                            borderRadius: "4px"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <Plus size={16} style={{ marginRight: "0.5rem", color: "#6b7280" }} />
                          <span>{skill}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Job Trials */}
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {filteredTrials.length > 0 ? (
                    filteredTrials.map((trial) => (
                      <div
                        key={trial.id}
                        style={{
                          background: "white",
                          borderRadius: "12px",
                          padding: "1.5rem",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                          <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>{trial.title}</h3>
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              background: trial.status === "available" ? "#2563eb" : trial.status === "in-progress" ? "#f59e0b" : "#9ca3af",
                              color: "white",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500"
                            }}
                          >
                            {trial.status === "available" ? "Available" : trial.status === "in-progress" ? "In Progress" : "Completed"}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#4b5563", marginBottom: "0.75rem" }}>
                          <Building size={16} style={{ marginRight: "0.5rem" }} />
                          <span>{trial.company}</span>
                          <Clock size={16} style={{ marginLeft: "1rem", marginRight: "0.5rem" }} />
                          <span>{trial.duration}</span>
                        </div>

                        <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "0.75rem", flex: 1 }}>
                          {trial.description}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                          {trial.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                display: "inline-block",
                                padding: "0.25rem 0.75rem",
                                background: "#f3f4f6",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                fontSize: "12px"
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <button
                          style={{
                            width: "100%",
                            padding: "0.75rem",
                            background: trial.status === "available" ? "#2563eb" : "#d1d5db",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: trial.status === "available" ? "pointer" : "not-allowed",
                            fontWeight: "500"
                          }}
                          disabled={trial.status !== "available"}
                        >
                          {trial.status === "available" ? "Start Trial" : trial.status === "in-progress" ? "Continue Trial" : "View Details"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div style={{ gridColumn: "1 / -1", textAlign: "center", paddingTop: "3rem" }}>
                      <Search size={48} style={{ margin: "0 auto", color: "#d1d5db" }} />
                      <h3 style={{ marginTop: "1rem", fontWeight: "500" }}>No job trials found</h3>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "0.5rem" }}>
                        Try adjusting your filters to see more opportunities.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
