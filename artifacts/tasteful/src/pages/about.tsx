import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="relative min-h-[50vh] flex items-center justify-center py-20 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2577&auto=format&fit=crop" 
          alt="Chef cooking" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Our Philosophy</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-serif italic">
            "Great food is not just about taste. It's about memory, comfort, and the care that goes into every single ingredient."
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-24">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Uncompromising Quality</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We started Tasteful with a simple premise: delivery food shouldn't mean compromising on quality. 
              Our kitchen operates exactly like a high-end restaurant, but optimized entirely for the at-home experience.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Every dish is designed to travel well, arrive hot, and taste just as incredible at your dining table as it would in our dining room.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2670&auto=format&fit=crop" 
              alt="Fresh ingredients" 
              className="rounded-2xl shadow-xl border w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2568&auto=format&fit=crop" 
              alt="Kitchen team" 
              className="rounded-2xl shadow-xl border w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Sourced with Purpose</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We work directly with local farmers, butchers, and artisans. This isn't just a marketing line—it's the foundation of our menu. 
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              By sourcing locally, we reduce our environmental footprint and ensure that every ingredient in your meal is at the absolute peak of its season.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
