/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { EvaluatorRole } from 'app/components/Auth/useRole';

interface EvaluatorItemProps {
  isEvaluationMode: boolean;

  onRoleChange: Function;
}

const EvaluatorItem = ({ isEvaluationMode, onRoleChange }: EvaluatorItemProps) => {
  return (
    <li onClick={onRoleChange(EvaluatorRole)}>
      <Link to="/dashboard" className={`left-nav-menu-modal ${isEvaluationMode && 'active-role'}`}>
        Evaluations
      </Link>
    </li>
  );
};

export default EvaluatorItem;
