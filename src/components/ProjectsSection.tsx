import React from 'react';

const projects = [
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/aa388752d6f6658df6b4fcee6b141e001158328b?placeholderIfAbsent=true',
    title: 'Israel Canada',
    description: 'עיצוב ופיתוח אתר נדל"ן מתקדם'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/c22f82cf2ef4eb51b822d54d2bdd7dac9c74c9f5?placeholderIfAbsent=true',
    title: 'Polestar',
    description: 'עיצוב חווית משתמש לאתר רכב חשמלי'
  },
  {
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/be2dcd2447248af8225102a121a6a1ff9913d3d2?placeholderIfAbsent=true',
    title: 'Afcon',
    description: 'מערכת ניהול תוכן מורכבת'
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen w-full bg-background py-24 px-16 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-normal text-foreground text-center mb-4">
          פרויקטים
        </h2>
        <p className="text-muted-foreground text-center text-lg mb-16 max-w-2xl mx-auto">
          בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.
        </p>

        <div className="grid grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="text-right">
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-3xl mb-4 object-cover aspect-[4/3]"
              />
              <h3 className="text-2xl font-medium text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
