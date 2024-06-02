import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  'Create Report': undefined;
};

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type CreateReportScreenProps = StackScreenProps<RootStackParamList, 'Create Report'>;

export type Question = {
  id: number;
  text: string;
};