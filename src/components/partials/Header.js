import { useRouter } from 'next/router';
import { FaChevronLeft } from 'react-icons/fa/';

export default function Header({ withBack = false }) {
  const { push } = useRouter();
  const backToHome = () => push('/');

  return (
    <div className="header" data-cy="header">
      <div data-cy="header-background" className="container d-flex align-items-center gap-4">
        {withBack
        && <FaChevronLeft data-cy="todo-back-button" size={32} className="icon-back my-auto d-block d-md-none" onClick={backToHome} />}
        <h1 data-cy="header-title">TO DO LIST APP</h1>
      </div>
    </div>
  );
}
