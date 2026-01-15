import React from 'react';

interface ProjectCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageSrc, title, description }) => {
  return (
    <article className="flex min-w-60 flex-col items-stretch w-[570px] max-md:max-w-full">
      <img
        src={imageSrc}
        alt={`${title} Project Preview`}
        className="object-contain w-full rounded-[32px] max-md:max-w-full"
      />
      <div className="max-w-full w-[545px] mt-3">
        <h3 className="text-[32px] font-medium leading-[1.7] max-md:max-w-full">
          {title}
        </h3>
        <p className="text-xl font-normal leading-[34px] max-md:max-w-full">
          {description}
        </p>
      </div>
    </article>
  );
};

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/aa388752d6f6658df6b4fcee6b141e001158328b?placeholderIfAbsent=true",
      title: "Israel Canada",
      description: "בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות"
    },
    {
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/c22f82cf2ef4eb51b822d54d2bdd7dac9c74c9f5?placeholderIfAbsent=true",
      title: "Polestar",
      description: "בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות"
    },
    {
      imageSrc: "https://api.builder.io/api/v1/image/assets/TEMP/be2dcd2447248af8225102a121a6a1ff9913d3d2?placeholderIfAbsent=true",
      title: "Afcon",
      description: "בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות"
    }
  ];

  return (
    <section>
      <header className="text-center mb-8">
        <h2 className="text-foreground text-5xl font-normal leading-none text-right ml-3 mt-[135px] max-md:text-[40px] max-md:mt-10">
          פרויקטים
        </h2>
        <p className="text-foreground text-xl font-normal leading-[34px] text-right mt-[15px] max-md:max-w-full">
          בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.
        </p>
      </header>
      
      <div className="flex gap-[40px_72px] text-foreground text-right max-md:max-w-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
