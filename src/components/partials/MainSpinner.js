import Spinner from 'react-bootstrap/Spinner';

export default function MainSpinner() {
  return (
    <div className="main-spinner-wrapper">
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
      />
    </div>
  );
}
