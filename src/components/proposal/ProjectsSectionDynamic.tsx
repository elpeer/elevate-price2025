import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '../ScrollAnimation';
import { supabase } from '@/integrations/supabase/client';

interface ProjectItem {
  title: string;
  description: string;
  image: string;
}

interface ProjectsData {
  title?: string;
  subtitle?: string;
  hiddenIds?: string[];
  // Legacy support
  projects?: any[];
}
interface Props { data: ProjectsData; }

const ProjectsSectionDynamic: React.FC<Props> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: rows } = await supabase
        .from('projects')
        .select('id,title,description,desktop_image,mobile_image,sort_order')
        .order('sort_order', { ascending: true });
      if (!mounted) return;
      const hidden = new Set(data.hiddenIds || []);
      const items = (rows || [])
        .filter((r: any) => !hidden.has(r.id))
        .map((r: any) => ({
          title: r.title,
          description: r.description,
          image: r.desktop_image || r.mobile_image || '',
        }));
      setProjects(items);
    })();
    return () => { mounted = false; };
  }, [data.hiddenIds]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => { if (!scrollRef.current) return; setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft); }, []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => { if (!isDragging || !scrollRef.current) return; e.preventDefault(); const x = e.pageX - scrollRef.current.offsetLeft; scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2; }, [isDragging, startX, scrollLeft]);

  const title = data.title || 'פרויקטים';
  const subtitle = data.subtitle || 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.';

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="w-full bg-background py-10 md:py-16 flex flex-col justify-center overflow-hidden">
      <div className="px-6 md:px-16 mb-6 md:mb-16">
        <ScrollAnimation><h2 className="text-2xl md:text-4xl font-normal text-foreground text-center mb-2 md:mb-4">{title}</h2></ScrollAnimation>
        <ScrollAnimation delay={0.1}><p className="text-muted-foreground text-center text-sm md:text-lg max-w-2xl mx-auto">{subtitle}</p></ScrollAnimation>
      </div>
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} ref={scrollRef} className={`flex gap-3 md:gap-6 overflow-x-auto select-none px-6 md:px-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ scrollbarWidth: 'none' }} dir="rtl" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onMouseMove={handleMouseMove}>
        {projects.map((project, i) => (
          <motion.div key={i} className="flex-shrink-0 text-right w-[220px] md:w-[500px]" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            {project.image && <img src={project.image} alt={project.title} className="w-full rounded-xl md:rounded-3xl mb-2 md:mb-4 object-cover aspect-[4/3] pointer-events-none" draggable={false} />}
            <h3 className="text-lg md:text-2xl font-medium text-foreground mb-1">{project.title}</h3>
            <p className="text-muted-foreground text-xs md:text-base">{project.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSectionDynamic;
