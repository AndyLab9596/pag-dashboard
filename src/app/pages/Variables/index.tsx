import { LocationPage } from './Location/Loadable';
import { StrategyPage } from './Strategy/Loadable';
import { TitlePage } from './Title/Loadable';
import Title from 'app/components/TitlePage/TitlePage';
import { ActionTitlePage } from './Title/components/ActionTitlePage';
import { ActionLocationPage } from './Location/components/ActionLocationPage';
import { ActionStrategyPage } from './Strategy/components/ActionStrategyPage';
import { ActionDepartmentPage } from './Department/components/ActionDepartmentPage';
import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import StaticModal from 'app/components/Modal/StaticModal';
import Select from 'app/components/ui/Form/Select';
import { RoutesPath } from 'app/routes/routesPath';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { SelectStrategies } from './Department/components/SelectStrategies';
import { DepartmentPage } from './Department/Loadable';

type VariablesPageSelectProps = any & { onChange: (v: string) => void };

interface VariableContextDefault {
  onOpenSave: () => void;
}

export const VariablesContext = createContext<VariableContextDefault>({
  onOpenSave: () => null,
});

const options = [
  {
    label: 'Titles',
    value: RoutesPath.VARIABLES_TITLE,
  },
  {
    label: 'Departments',
    value: RoutesPath.VARIABLES_DEPARTMENT,
  },
  {
    label: 'Locations',
    value: RoutesPath.VARIABLES_LOCATION,
  },
  {
    label: 'Strategy',
    value: RoutesPath.VARIABLES_STRATEGY,
  },
];

const VariablesPageSelect: React.FC<VariablesPageSelectProps> = ({ onChange, ...props }) => {
  return <Select {...props} options={options} onChange={option => option.value && onChange(option)} />;
};

export const VariablesPage = props => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleSelect = option => {
    navigate(option.value);
  };

  const [strategyId, setStrategyId] = useState<number>();
  const [strategyName, setStrategyName] = useState<string>();
  const onChange = e => {
    setStrategyId(e && e.value);
    setStrategyName(e && e.label);
  };
  const { isOpen: isOpenSave, onOpen: onOpenSave, onClose: onCloseSave } = useDisclosure();

  return (
    <VariablesContext.Provider value={{ onOpenSave }}>
      <LayoutRightSide>
        <div className="flex justify-between">
          <div className="flex gap-10">
            <div className="flex flex-col gap-x-10">
              <Title>Variable</Title>
              <VariablesPageSelect
                className="min-w-200"
                isClearable={false}
                defaultValue={options.find(option => pathname.includes(option.value)) ?? options[0]}
                onChange={handleSelect}
              />
            </div>
            {pathname.includes(RoutesPath.VARIABLES_DEPARTMENT) && <SelectStrategies onChange={onChange} />}
          </div>

          <div className="mt-10">
            <Routes>
              <Route path="*" element={<ActionTitlePage />} />
              <Route path={RoutesPath.VARIABLES_TITLE + '/*'} element={<ActionTitlePage />} />
              <Route
                path={RoutesPath.VARIABLES_DEPARTMENT + '/*'}
                element={<ActionDepartmentPage strategyName={strategyName} strategyId={strategyId} />}
              />
              <Route path={RoutesPath.VARIABLES_LOCATION + '/*'} element={<ActionLocationPage />} />
              <Route path={RoutesPath.VARIABLES_STRATEGY + '/*'} element={<ActionStrategyPage />} />
            </Routes>
          </div>
        </div>
        <Routes>
          <Route path="*" element={<TitlePage />} />
          <Route path={RoutesPath.VARIABLES_TITLE + '/*'} element={<TitlePage />} />
          <Route path={RoutesPath.VARIABLES_DEPARTMENT + '/*'} element={<DepartmentPage strategyId={strategyId} />} />
          <Route path={RoutesPath.VARIABLES_LOCATION + '/*'} element={<LocationPage />} />
          <Route path={RoutesPath.VARIABLES_STRATEGY + '/*'} element={<StrategyPage />} />
        </Routes>
        <StaticModal isOpen={isOpenSave} onClose={onCloseSave} variant="successSave" />
      </LayoutRightSide>
    </VariablesContext.Provider>
  );
};
