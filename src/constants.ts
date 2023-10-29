import { RouteProp } from '@react-navigation/native';

import Animation from './screens/Animation';
import CurrencyConvertor from './screens/CurrencyConvertor';
import MusicTrackPlayerProviders from './screens/MusicTrackPlayer/Providers';
import PasswordGenerator from './screens/PasswordGenerator';
import PasswordGeneratorUsingFormik from './screens/PasswordGeneratorUsingFormik';
import RollTheDice from './screens/RollTheDice';
import TicTacToe from './screens/TicTacToe';
import Tut01 from './screens/Tut01';
import Tut02 from './screens/Tut02';
import Tut03 from './screens/Tut03';

import { TAppParamList } from './AppParamList';

type Button = {
  name: keyof TAppParamList;
  text: string;
  component:
    | React.ComponentType<{
        route: RouteProp<TAppParamList, keyof TAppParamList>;
        navigation: any;
      }>
    | React.ComponentType<{}>;
};

export const BUTTONS: Button[] = [
  { name: 'Animation', text: 'Animation', component: Animation },
  {
    name: 'CurrencyConvertor',
    text: 'Currency convertor',
    component: CurrencyConvertor,
  },
  {
    name: 'MusicTrackPlayer',
    text: 'Music track player',
    component: MusicTrackPlayerProviders,
  },
  {
    name: 'PasswordGenerator',
    text: 'Password generator',
    component: PasswordGenerator,
  },
  {
    name: 'PasswordGeneratorUsingFormik',
    text: 'Password generator using formik',
    component: PasswordGeneratorUsingFormik,
  },
  { name: 'RollTheDice', text: 'Roll the dice', component: RollTheDice },
  { name: 'TicTacToe', text: 'Tic tac toe', component: TicTacToe },
  { name: 'Tut01', text: 'Tut01', component: Tut01 },
  { name: 'Tut02', text: 'Tut02', component: Tut02 },
  { name: 'Tut03', text: 'Tut03', component: Tut03 },
];
