export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-grid bg-ink pb-10 pt-8 text-small text-muted-inverse">
      <div className="col-span-12 flex flex-col gap-2 border-t border-paper/10 pt-8 sm:flex-row sm:justify-between">
        <p>© {year} Kymani Jarrett</p>
        <p>Built with React, Vite, Three.js, and Motion.</p>
      </div>
    </footer>
  )
}
