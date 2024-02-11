import { NavLink as Link } from "react-router-dom";
import Icon from "./Icon";
import { CERTIFICATE_WALLET_BACKEND_URL } from "../../Services/http";

function Card(props) {
  const { name, category, type, id, thumbnail } = props;

  return (
    <>
      <Link
        to={
          type === "new"
            ? `/certificate/new?category=${category}`
            : `/certificate/${id}`
        }
        className="card relative overflow-hidden w-60 h-40 rounded-lg bg-[--secondary-color] flex-shrink-0 flex justify-center items-center cursor-pointer"
      >
        {thumbnail && (
          <img
            src={CERTIFICATE_WALLET_BACKEND_URL + "/" + thumbnail}
            alt="certificateImage"
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        )}
        <div className="cover absolute h-full w-full bg-black opacity-0"></div>
        {type === "new" ? (
          <Icon name="add" className="icon-container" />
        ) : (
          <div className="absolute card-title opacity-0 text-white">{name}</div>
        )}
      </Link>
    </>
  );
}

export default Card;
