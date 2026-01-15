import React from 'react';

const clients = [
  { name: 'Playtika', logo: 'https://api.builder.io/api/v1/image/assets/TEMP/007e55697bfb495081352f2cd5144f56d07ec3d9?placeholderIfAbsent=true' },
  { name: 'Leumi', logo: 'https://api.builder.io/api/v1/image/assets/TEMP/678663df2fa5254b2ae0a5c477ebf981314dd94f?placeholderIfAbsent=true' },
  { name: 'Partner', logo: 'https://api.builder.io/api/v1/image/assets/TEMP/2c2f65d8a0b76240902853189793be00b5fcc5e6?placeholderIfAbsent=true' },
];

const ClientsSection: React.FC = () => {
  return (
    <section className="bg-secondary py-16 px-16">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-medium text-foreground text-center mb-12">
          נבחרנו על ידי הטובים ביותר
        </h3>
        
        <div className="flex items-center justify-center gap-16 flex-wrap">
          {clients.map((client, index) => (
            <img
              key={index}
              src={client.logo}
              alt={client.name}
              className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
