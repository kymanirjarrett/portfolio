export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="page-grid gap-y-10 py-section">
      <h2 id="about-heading" className="heading-display col-span-12 text-h2">
        About me
      </h2>

      <div className="col-span-12 max-w-measure space-y-5 text-lead lg:col-span-7">
        <p>
          I'm Kymani, a double major in Information Technology and Cybersecurity at the University
          of Cincinnati, graduating May 2028.
        </p>
        <p>
          I've spent the last two years building across the stack, from React front ends and Node
          APIs at the UC IT Solutions Center to AWS data pipelines and CI/CD at The J.M. Smucker Co.
          Outside of work, I build projects like Vigil and Clausify to go deeper on the problems I
          run into.
        </p>
        <p>
          Currently looking for a Summer 2027 internship or co-op in cloud, platform, or security
          engineering.
        </p>
      </div>

      <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-3 lg:col-start-10 lg:self-start">
        {/* WebP at two sizes for normal and high-density screens; the PNG is the fallback. */}
        <picture>
          <source
            type="image/webp"
            srcSet="/headshot-480.webp 480w, /headshot-960.webp 960w"
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 60vw, 100vw"
          />
          <img
            src="/professionalheadshot.png"
            alt="Portrait of Kymani Jarrett"
            width={1086}
            height={1448}
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full rounded-panel object-cover"
          />
        </picture>
        <div className="mt-6 border-t border-fg/15 pt-6">
          <p className="font-display font-semibold">University of Cincinnati</p>
          <p className="mt-1 text-muted">
            B.Sc. in Information Technology and B.Sc. in Cybersecurity. GPA 3.7, 3× Dean's List.
          </p>
        </div>
      </div>
    </section>
  )
}
