import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'app/routes/Route';
import { EvaluationTable } from './EvaluationTable/Loadable';
import { EvaluationEdit } from './EvaluationTypeEdit/Loadable';
import { EvaluationAdd } from './EvaluationTypeAdd/Loadable';

export function EvaluationTypePage() {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<EvaluationTable />} />
        <Route path="add" element={<EvaluationAdd />} />
        <Route path="edit/:id" element={<EvaluationEdit />} />
      </Route>
    </Routes>
  );
}
