import { EnhancedProductContent } from '@/data/enhancedProductContent';
import { Check } from 'lucide-react';

interface Props {
  content: EnhancedProductContent;
}

const EnhancedProductContentSection = ({ content }: Props) => {
  return (
    <div className="space-y-12 mt-12">
      {/* Hero Subtext */}
      <div className="bg-secondary/30 rounded-2xl p-8 border border-accent/20">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {content.heroSubtext}
        </p>
      </div>

      {/* Content Sections */}
      {content.sections.map((section, idx) => (
        <section key={idx} className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            {section.title}
          </h2>
          {section.content.map((para, pIdx) => (
            <p key={pIdx} className="text-muted-foreground leading-relaxed">
              {para}
            </p>
          ))}
          {section.listItems && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {section.listItems.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Ingredients */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Key Ingredients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.ingredients.map((ingredient, idx) => (
            <div 
              key={idx} 
              className="bg-secondary/20 rounded-xl p-4 border border-border hover:border-accent/30 transition-colors"
            >
              <h3 className="font-semibold text-accent mb-1">{ingredient.name}</h3>
              <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Benefits You Can Feel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-xl p-5 border border-accent/10"
            >
              <span className="text-3xl mb-3 block">{benefit.icon}</span>
              <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          How to Use
        </h2>
        <p className="text-foreground font-medium mb-4">{content.howToUse.instructions}</p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Combine with:</p>
          <div className="flex flex-wrap gap-2">
            {content.howToUse.combineWith.map((item, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedProductContentSection;
