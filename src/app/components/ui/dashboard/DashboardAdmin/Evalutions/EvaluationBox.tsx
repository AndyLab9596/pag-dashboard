import React from 'react';
import { Chart } from '../../Chart';

interface EvaluationBoxProps {
  title?: string;
  complete?: number;
  overall?: number;
  percentComplete: number;
  color: string;
  icon?: JSX.Element;
}

const EvaluationBox: React.FC<EvaluationBoxProps> = props => {
  const { title, complete, overall, percentComplete, color, icon } = props;
  return (
    <div className="flex flex-1 flex-col">
      {title && <p className="mt-15 py-0 px-18 text-17 font-semibold text-darkBlack">{title}</p>}
      <div className="flex py-0 px-18">
        <div className="flex flex-1 flex-col justify-center text-13">
          {typeof complete !== 'undefined' && typeof overall !== 'undefined' && (
            <p className="mb-13">
              {complete} of {overall} Completed
            </p>
          )}
          <div className="flex items-center">
            {icon && <div className="mr-10">{icon}</div>}
            <div>Status {percentComplete}% Completed</div>
          </div>
        </div>
        <div className="m-15">
          <Chart color={color} value={percentComplete} />
        </div>
      </div>
    </div>
  );
};

export default EvaluationBox;
