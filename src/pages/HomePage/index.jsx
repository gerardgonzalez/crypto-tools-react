import { MainLayout } from '../../layouts/MainLayout';
import { Welcome } from './Welcome';

export const HomePage = () => {
  return (
    <MainLayout bodyClassName="pt-sm" navGradient={true}>
      <Welcome />
    </MainLayout>
  );
};