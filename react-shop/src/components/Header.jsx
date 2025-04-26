export function Header() {
  return (
    <nav>
      <div className="nav-wrapper indigo lighten-1">
        <div className="container">
          <a href="#!" className="brand-logo">
            React Shop
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="#!">Repository</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}