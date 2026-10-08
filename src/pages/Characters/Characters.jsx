import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCharacters } from "../../hooks/useCharacters";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import { CHARACTER_IMAGES } from "../../consts";

const Characters = () => {
  const { allData, loading } = useCharacters();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return allData.filter((data) => data.name.toLowerCase().includes(query));
  }, [allData, searchValue]);

  // Enter / Search: jump straight to a character if the query narrows to one,
  // or matches a name exactly.
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim().toLowerCase();
    const match =
      filteredData.length === 1
        ? filteredData[0]
        : filteredData.find((c) => c.name.toLowerCase() === query);
    if (match) navigate(`/character/${match.slug}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="realm explorepage">
      <div className="insidestuff">
        <h1 className="page-title">The Characters</h1>
        <p className="page-subtitle">Choose a voice from the Seven Kingdoms</p>

        <form className="formHome" onSubmit={handleSubmit} role="search">
          <input
            className="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name..."
            aria-label="Search characters"
          />
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>
        <p className="result-count">
          {filteredData.length} of {allData.length} characters
        </p>

        <section className="nameslist">
          <ul className="divList">
            {filteredData.map((character) => (
              <li key={character.slug}>
                <Link className="linkList" to={`/character/${character.slug}`}>
                  <article className="char-card">
                    <Avatar
                      src={CHARACTER_IMAGES[character.name]}
                      name={character.name}
                    />
                    <span className="name">{character.name}</span>
                    {character.house?.name && (
                      <span className="house">{character.house.name}</span>
                    )}
                  </article>
                </Link>
              </li>
            ))}
            {filteredData.length === 0 && (
              <li className="empty">No one by that name walks these lands.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Characters;
