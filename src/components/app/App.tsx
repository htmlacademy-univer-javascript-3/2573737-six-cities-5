import {Main} from '../../pages/main/Main.tsx';
import {PlacesInfo} from '../card/Card.tsx';

interface Props {
  placesCount: number;
  placesInfo: PlacesInfo[];
}

// временный костыль. EELint ругается: placesCount и placesInfo is missing in props validation, хотя вот же выше они объявлены
// eslint-disable-next-line react/prop-types
export const App: React.FC<Props> = ({placesCount, placesInfo}) => (
  <Main placesCount={placesCount} placesInfo={placesInfo}/>
);
