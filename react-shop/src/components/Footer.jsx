export function Footer() {
  return (
    <footer className="page-footer indigo lighten-1">
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Коротенко Анастасия
          <a className="grey-text text-lighten-4 right" href="#!">
            Repository
          </a>
        </div>
      </div>
    </footer>
  );
}