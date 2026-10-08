import { Link, NavLink, useLocation } from "react-router-dom";

const navigationLinks = [
  { title: "Home", slug: "/" },
  { title: "Characters", slug: "/characters" },
];

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <header className="header">
      <nav>
        <Link className="brand" to="/">
          Game of Quotes
        </Link>
        <ul className="listHeader">
          {navigationLinks.map((link) => (
            <li key={link.slug}>
              <NavLink
                className="headerLink"
                to={link.slug}
                end={link.slug === "/"}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
