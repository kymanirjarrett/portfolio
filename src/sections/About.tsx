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

      <div className="col-span-12 self-end border-t border-ink/15 pt-6 lg:col-span-4 lg:col-start-9">
        <p className="font-display font-semibold">University of Cincinnati</p>
        <p className="mt-1 text-muted">
          B.Sc. in Information Technology and B.Sc. in Cybersecurity. GPA 3.7, 3× Dean's List.
        </p>
      </div>
    </section>
  )
}
