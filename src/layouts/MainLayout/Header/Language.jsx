
import globeIcon from '../../../assets/vectors/btn-icon-globe.svg';
import arrowIcon from '../../../assets/vectors/btn-icon-arrow.svg';

export const Language = () => {
  return (
    <button className="btn btn-transparent dropdown">
      <img src={globeIcon} alt="Language" />
      <div className="btn-text mx-2 px-1">English</div>
      <img src={arrowIcon} alt="Arrow" />
      <div className="dropdown-content">
        <div className="dropdown-item">Español</div>
        <div className="dropdown-item">French</div>
      </div>
    </button>
  )
}
