import { useNavigate, useParams } from "react-router-dom";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import { CHARACTER_IMAGES } from "../../consts";

const CharacterDetails = () => {
  const { id } = useParams();
  const { quotes, loading } = useCharacterDetails(id);
  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (!quotes || quotes.length === 0) {
    return <div className="realm not-found">No character data found.</div>;
  }

  const character = quotes[0];
  // The API returns character objects whose `quotes` is a list of strings.
  const allQuotes = quotes.flatMap((item) => item.quotes ?? item);

  return (
    <div className="realm quotepage">
      <div className="details">
        <div className="btncontainer">
          <button onClick={() => navigate("/characters")}>
            &larr; All characters
          </button>
        </div>
        <div className="listInfo">
          <div className="insidecard">
            <Avatar
              className="characterImage"
              src={CHARACTER_IMAGES[character.name]}
              name={character.name}
            />
            <h1 className="char-name">{character.name}</h1>
            <span className="char-house">
              {character.house?.name ?? "House unknown"}
            </span>

            <h2 className="quotes-heading">Words spoken</h2>
            <ul className="quoteList">
              {allQuotes.map((text, ind) => (
                <li key={ind} className="quote">
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
