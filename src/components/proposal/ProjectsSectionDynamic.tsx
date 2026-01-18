import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '../ScrollAnimation';

// Normalized shape expected by the component
interface ProjectItem {
  title: string;
  description: string;
  image: string;
}

// Raw shape that might come from DB
interface RawProjectItem {
  id?: number | string;
  title: string;
  description?: string;
  image?: string;
  desktopImage?: string;
  mobileImage?: string;
}

interface ProjectsData {
  title?: string;
  subtitle?: string;
  projects?: RawProjectItem[];
}
interface Props { data: ProjectsData; }

const defaultProjects: ProjectItem[] = [
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/aa388752d6f6658df6b4fcee6b141e001158328b', title: 'Israel Canada', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/c22f82cf2ef4eb51b822d54d2bdd7dac9c74c9f5', title: 'Polestar', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' },
  { image: 'https://api.builder.io/api/v1/image/assets/TEMP/be2dcd2447248af8225102a121a6a1ff9913d3d2', title: 'Afcon', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' }
];

const normalizeProjects = (raw: RawProjectItem[] | undefined): ProjectItem[] => {
  if (!Array.isArray(raw) || raw.length === 0) return defaultProjects;
  return raw.map((p) => ({
    title: p.title || '',
    description: p.description || '',
    image: p.image || p.desktopImage || p.mobileImage || '',
  }));
};

const ProjectsSectionDynamic: React.FC<Props> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => { if (!scrollRef.current) return; setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft); }, []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => { if (!isDragging || !scrollRef.current) return; e.preventDefault(); const x = e.pageX - scrollRef.current.offsetLeft; scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2; }, [isDragging, startX, scrollLeft]);

  const title = data.title || 'פרויקטים';
  const subtitle = data.subtitle || 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.';
  const projects = normalizeProjects(data.projects);

  return (
    <section id="projects" className="w-full bg-background py-10 md:py-16 flex flex-col justify-center overflow-hidden">
      <div className="px-6 md:px-16 mb-6 md:mb-16">
        <ScrollAnimation><h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-2 md:mb-4">{title}</h2></ScrollAnimation>
        <ScrollAnimation delay={0.1}><p className="text-muted-foreground text-center text-sm md:text-lg max-w-2xl mx-auto">{subtitle}</p></ScrollAnimation>
      </div>
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} ref={scrollRef} className={`flex gap-3 md:gap-6 overflow-x-auto select-none px-6 md:px-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ scrollbarWidth: 'none' }} dir="rtl" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={handleMouseMove}>
        {projects.map((project, i) => (
          <motion.div key={i} className="flex-shrink-0 text-right w-[220px] md:w-[500px]" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <img src={project.image} alt={project.title} className="w-full rounded-xl md:rounded-3xl mb-2 md:mb-4 object-cover aspect-[4/3] pointer-events-none" draggable={false} />
            <h3 className="text-lg md:text-2xl font-medium text-foreground mb-1">{project.title}</h3>
            <p className="text-muted-foreground text-xs md:text-base">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSectionDynamic;
