"use client";

import { motion } from "framer-motion";
import { 
  SiHtml5,
  SiCss,
  SiReact, 
  SiNextdotjs, 
  SiJavascript, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress,
  SiMongodb, 
  SiMongoose,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiGit,
  SiVercel,
  SiRender,
  SiPostman,
  SiDocker
} from "react-icons/si";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      
      { name: "React.js", level: "90%", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Next.js", level: "85%", icon: SiNextdotjs, color: "text-foreground" },
      { name: "JavaScript", level: "90%", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", level: "80%", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Tailwind CSS", level: "95%", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "HTML5", level: "95%", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "CSS3", level: "90%", icon: SiCss, color: "text-[#1572B6]" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "80%", icon: SiNodedotjs, color: "text-[#339933]" },
      { name: "Express.js", level: "85%", icon: SiExpress, color: "text-foreground" },
      { name: "MongoDB", level: "85%", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Mongoose", level: "85%", icon: SiMongoose, color: "text-[#880000]" },
      { name: "PostgreSQL", level: "75%", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "Prisma", level: "75%", icon: SiPrisma, color: "text-[#2D3748]" },
      { name: "JWT", level: "80%", icon: SiJsonwebtokens, color: "text-[#D63031]" },
    ],
  },
  {
    category: "Tools & Cloud",
    skills: [
      { name: "Docker", level: "70%", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Git & GitHub", level: "88%", icon: SiGit, color: "text-[#F05032]" },
      { name: "Vercel", level: "90%", icon: SiVercel, color: "text-foreground" },
      { name: "Render", level: "80%", icon: SiRender, color: "text-[#46E3B7]" },
      { name: "Postman", level: "85%", icon: SiPostman, color: "text-[#FF6C37]" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-10 sm:py-14 relative bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground"
          >
            My Work <span className="text-accent">Skills</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-xs sm:text-sm text-foreground/75"
          >
            Technologies, frameworks, and tools I use to build robust full-stack applications.
          </motion.p>
        </div>

        {/* Categories Rows */}
        <div className="space-y-8">
          {skillCategories.map((catGroup, catIdx) => (
            <motion.div 
              key={catGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-card-bg/40 p-4 rounded-2xl border border-border/50"
            >
              {/* Left Column: Category Badge Button */}
              <div className="md:col-span-3 flex justify-start md:justify-start">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-accent/10 border border-accent/25 text-accent shadow-sm">
                  {catGroup.category}
                </span>
              </div>

              {/* Right Column: Skill Cards Grid */}
              <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {catGroup.skills.map((skill, skillIdx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIdx * 0.03 }}
                      className="group p-3 rounded-xl bg-card-bg border border-border/60 hover:border-accent/50 transition-all duration-300 shadow-sm flex flex-col items-center justify-between gap-2 text-center"
                    >
                      <div className={`text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 ${skill.color}`}>
                        <Icon />
                      </div>

                      <h3 className="text-[11px] sm:text-xs font-semibold text-foreground tracking-tight leading-tight">
                        {skill.name}
                      </h3>

                      <div className="w-full py-0.5 px-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-bold text-[10px] tracking-wide">
                        {skill.level}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}