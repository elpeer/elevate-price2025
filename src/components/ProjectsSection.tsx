import React, { useRef, useState, useCallback } from 'react';

const projects = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/aa388752d6f6658df6b4fcee6b141e001158328b?placeholderIfAbsent=true',
    title: 'Israel Canada',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c22f82cf2ef4eb51b822d54d2bdd7dac9c74c9f5?placeholderIfAbsent=true',
    title: 'Polestar',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/be2dcd2447248af8225102a121a6a1ff9913d3d2?placeholderIfAbsent=true',
    title: 'Afcon',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/aa388752d6f6658df6b4fcee6b141e001158328b?placeholderIfAbsent=true',
    title: 'Playtika',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c22f82cf2ef4eb51b822d54d2bdd7dac9c74c9f5?placeholderIfAbsent=true',
    title: 'Abbott',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/be2dcd2447248af8225102a121a6a1ff9913d3d2?placeholderIfAbsent=true',
    title: 'Statement',
    description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות'
  }
];

const ProjectsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  return (
    <section id="projects" className="w-full bg-background py-16 flex flex-col justify-center overflow-hidden">
      {/* Header with padding */}
      <div className="px-16 mb-16">
        <h2 className="text-4xl font-normal text-foreground text-center mb-4">
          פרויקטים
        </h2>
        <p className="text-muted-foreground text-center text-lg max-w-2xl mx-auto">
          בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.
        </p>
      </div>

      {/* Full-width slider without padding */}
      <div 
        ref={scrollRef}
        className={`flex gap-6 overflow-x-auto select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingLeft: '0',
          paddingRight: '0'
        }}
        dir="rtl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 text-right"
            style={{ width: '500px' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-3xl mb-4 object-cover aspect-[4/3] pointer-events-none"
              draggable={false}
            />
            <h3 className="text-2xl font-medium text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
