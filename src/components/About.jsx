import { MapPin, Code, Palette, Zap } from "lucide-react";
import me from "@/assets/me.jpg";
import Image from "next/image";

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Modern Design",
      description: "Creating beautiful, user-centered interfaces",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance",
      description: "Optimizing for speed and smooth interactions",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-8"></div>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="text-primary font-medium">Moataseem</span>,
                a passionate web developer based in{" "}
                <span className="text-foreground font-medium inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Egypt
                </span>
                . I specialize in creating exceptional digital experiences that
                combine beautiful design with seamless functionality.
              </p>

              <p>
                Whether you already have the backend and UI ready, or
                you&apos;re starting from scratch , <span className="text-primary font-medium">I’ve got you covered.</span>
              </p>

              <p>
                Currently, I'm{" "}
                <span className="text-primary font-medium">
                  looking for exciting opportunities
                </span>{" "}
                in digital agencies and am also available for freelance
                collaborations. I love working on projects that challenge me to
                push the boundaries of what's possible on the web.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            <div className="relative z-10">
              {/* Profile Image Placeholder */}
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <Image src={me} alt="Moataseem" />

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/50 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/30 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
