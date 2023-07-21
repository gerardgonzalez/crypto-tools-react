
export const Language = () => {
  return (
    <button className="btn btn-transparent dropdown">
      <img src="/src/assets/vectors/btn-icon-globe.svg" alt="Language" />
      <div className="btn-text mx-2 px-1">English</div>
      <img src="/src/assets/vectors/btn-icon-arrow.svg" alt="btn-icon-arrow" />
      <div className="dropdown-content">
        <div className="dropdown-item">Español</div>
        <div className="dropdown-item">French</div>
      </div>
    </button>
  )
}
