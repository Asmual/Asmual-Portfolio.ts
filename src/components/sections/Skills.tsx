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
import { Code2, Server, Wrench, Sparkles } from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
}

interface SkillCategoryGroup {
  category: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryIcon: any;
  skills: SkillItem[];
}

const skillCategories: SkillCategoryGroup[] = [
  {
    category: "Frontend",
    subtitle: "Client-side architecture & UI",
    categoryIcon: Code2,
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
    subtitle: "Server logic, APIs & Database",
    categoryIcon: Server,
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
    subtitle: "DevOps, VCS & APIs",
    categoryIcon: Wrench,
    skills: [
      { name: "Git & GitHub", level: "88%", icon: SiGit, color: "text-[#F05032]" },
      { name: "Docker", level: "70%", icon: SiDocker, color: "text-[#2496ED]" },
      { name: "Vercel", level: "90%", icon: SiVercel, color: "text-foreground" },
      { name: "Render", level: "80%", icon: SiRender, color: "text-[#46E3B7]" },
      { name: "Postman", level: "85%", icon: SiPostman, color: "text-[#FF6C37]" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 relative bg-background border-t border-border/50">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Arsenal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Skills &amp; <span className="text-accent">Technologies</span>
          </h2>

          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
            A curated list of frameworks, tools, and platforms I use to architect scalable and modern web applications.
          </p>
        </div>

        {/* 3-Column Professional Category Formation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start">
          {skillCategories.map((group, groupIdx) => {
            const CategoryIcon = group.categoryIcon;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                className="bg-card-bg border border-border rounded-2xl p-5 shadow-sm hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/70 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                        {group.category}
                      </h3>
                      <p className="text-[11px] text-foreground/60 leading-tight">
                        {group.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {group.skills.length}
                  </span>
                </div>

                {/* Compact & Moderate Skill Badges */}
                <div className="space-y-2">
                  {group.skills.map((skill, skillIdx) => {
                    const SkillIcon = skill.icon;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: 0.15 + skillIdx * 0.03 }}
                        className="group/skill flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/50 hover:border-accent/40 hover:bg-card-bg transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`text-lg sm:text-xl shrink-0 transition-transform duration-200 group-hover/skill:scale-110 ${skill.color}`}>
                            <SkillIcon />
                          </div>
                          <span className="text-xs font-semibold text-foreground/90 group-hover/skill:text-foreground truncate">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md">
                            {skill.level}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}