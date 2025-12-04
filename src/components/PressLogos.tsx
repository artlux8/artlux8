const PressLogos = () => {
  const logos = [
    "VOGUE", "The Washington Post", "NEW YORK POST", "GQ", "FORBES", "TIME"
  ];

  return (
    <section className="py-8 bg-secondary border-y border-border overflow-hidden">
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8 md:px-12"
          >
            <span className="text-muted-foreground/60 font-display text-lg md:text-xl font-semibold tracking-wider whitespace-nowrap">
              {logo}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressLogos;