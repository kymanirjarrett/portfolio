const EMAIL = 'jarretkr@mail.uc.edu'

const linkClass =
  'font-display font-semibold text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg'

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="page-grid bg-surface py-section text-fg"
    >
      <h2 id="contact-heading" className="heading-display col-span-12 text-h2">
        Contact
      </h2>
      <p className="col-span-12 mt-6 text-lead text-muted">
        I check my email regularly, feel free to reach out to me or connect with me on LinkedIn!
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className="col-span-12 mt-8 justify-self-start break-all font-display text-[clamp(1.75rem,1rem+3.4vw,5.5rem)] font-bold leading-tight tracking-[-0.02em] underline decoration-cobalt decoration-[0.06em] underline-offset-[0.14em] transition-colors hover:decoration-fg [font-stretch:112%]"
      >
        {EMAIL}
      </a>

      <ul className="col-span-12 mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <li>
          <a
            href="https://github.com/kymanirjarrett"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/kymanirjarrett"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="/resume.pdf"
            download="Kymani_Jarrett_Resume.pdf"
            className="inline-flex rounded-full border border-fg/30 px-5 py-2.5 font-display font-semibold text-fg transition-colors hover:border-fg/60 hover:bg-canvas/10"
          >
            Download resume
          </a>
        </li>
      </ul>
    </section>
  )
}
