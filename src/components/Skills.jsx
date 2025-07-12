const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React", level: 95, color: "bg-blue-500" },
        { name: "JavaScript (ES6+)", level: 90, color: "bg-yellow-500" },
        { name: "TypeScript", level: 85, color: "bg-blue-600" },
        { name: "HTML5", level: 95, color: "bg-orange-500" },
        { name: "CSS3", level: 90, color: "bg-blue-400" }
      ]
    },
    {
      title: "Styling & Animation",
      skills: [
        { name: "Tailwind CSS", level: 95, color: "bg-teal-500" },
        { name: "GSAP", level: 88, color: "bg-green-500" },
        { name: "Framer Motion", level: 82, color: "bg-purple-500" },
        { name: "Sass/SCSS", level: 85, color: "bg-pink-500" },
        { name: "CSS Grid & Flexbox", level: 92, color: "bg-indigo-500" }
      ]
    },
    {
      title: "Tools & Frameworks",
      skills: [
        { name: "Next.js", level: 88, color: "bg-gray-800" },
        { name: "Vite", level: 85, color: "bg-purple-600" },
        { name: "Git & GitHub", level: 90, color: "bg-gray-700" },
        { name: "Figma", level: 80, color: "bg-red-500" },
        { name: "Webpack", level: 75, color: "bg-blue-700" }
      ]
    }
  ]

  const SkillBar = ({ skill }) => (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-foreground font-medium">{skill.name}</span>
        <span className="text-muted-foreground text-sm">{skill.level}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  )

  const SkillCategory = ({ category }) => (
    <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
        {category.title}
      </h3>
      <div className="space-y-6">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Skills & <span className="text-primary">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm passionate about staying up-to-date with the latest technologies and best practices 
            in frontend development. Here's a breakdown of my technical skills and proficiency levels.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </div>

        {/* Additional Skills */}
        <div className="bg-secondary/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Additional Skills & Interests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex flex-wrap justify-center gap-4">
            {[
              "Responsive Design", "SEO",   "Accessibility (a11y)",
              "API Integration", "Testing (Jest)", "Agile/Scrum", "UI/UX Design",
              "Progressive Web Apps", "Cross-browser Compatibility" ,"Performance Optimization",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            Currently Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Three.js", "WebGL", "Node.js", "GraphQL", "React Native"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-card border border-border text-foreground rounded-full text-sm font-medium hover:border-primary transition-all duration-300 cursor-default"
              >
                {skill} 📚
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

