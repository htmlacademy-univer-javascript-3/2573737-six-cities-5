type BookmarkProps = {
  isFavorite: boolean;
  handleToggleFavoriteStatus: () => void;
};

const BookmarkButton = ({
  isFavorite,
  handleToggleFavoriteStatus,
}: BookmarkProps): JSX.Element => (
  <button
    className={`place-card__bookmark-button${
      isFavorite ? ' place-card__bookmark-button--active' : ''
    } button`}
    type="button"
    onClick={handleToggleFavoriteStatus}
  >
    <svg className="place-card__bookmark-icon" width="18" height="19">
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">
      {isFavorite ? 'To bookmarks' : 'In bookmarks'}
    </span>
  </button>
);

export default BookmarkButton;
