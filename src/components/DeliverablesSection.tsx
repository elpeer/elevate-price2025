import React from 'react';
import { Palette, Code, Layers, Brush } from 'lucide-react';

const deliverables = [
  {
    icon: Palette,
    title: 'אפיון ועיצוב',
    description: 'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים שיוגדרו'
  },
  {
    icon: Code,
    title: 'פיתוח Frontend',
    description: 'פיתוח קוד נקי ומותאם לכל הפלטפורמות'
  },
  {
    icon: Layers,
    title: 'בניית Design System',
    description: 'מערכת עיצוב מקיפה לשימוש עתידי'
  },
  {
    icon: Brush,
    title: 'מיתוג (אופציונלי)',
    description: 'עיצוב זהות מותג מקיפה'
  }
];

const DeliverablesSection: React.FC = () => {
  return (
    <section className="bg-secondary py-24 px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-normal text-foreground text-center mb-16">
          כל מה שנספק לך
        </h2>

        <div className="space-y-3">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-6 rounded-xl ${
                index % 2 === 0 ? 'bg-background' : 'bg-background/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-right flex-1 mr-4">
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
