import TitlePage from 'app/components/TitlePage/TitlePage';
import StrategyDropdown from 'app/components/ui/dashboard/StrategyDropdown';

export const SelectStrategies = props => {
  const { onChange } = props;
  return (
    <div className="flex flex-col gap-x-10">
      <TitlePage>STRATEGY</TitlePage>
      <StrategyDropdown onChange={onChange} />
    </div>
  );
};
