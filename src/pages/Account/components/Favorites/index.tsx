import { useAtom, useAtomValue } from 'jotai';
import { favoriteCategoriesAtom, favoritesAtom, selectedFavoriteCategoryAtom } from './favorites.atom.ts';
import Loader from '../../../../shared/Loader';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import CategoriesBar from '../../../Main/components/CategoriesBar';
import EstablishmentList from '../../../Main/components/CategorySection/components/EstablishmentList';
import CategorySection from '../../../Main/components/CategorySection';
import { accountCategoriesAtom, selectedAccountCategoryAtom } from '../../account.atom.ts';
import EmptyEstablishments from '../../../../components/EmptyEstablishments';
import { useNavigate } from 'react-router-dom';
import './Favorites.scss'

const ProfileFavorites: React.FC = () => {
  const favorites= useAtomValue(favoritesAtom);
  const navigate = useNavigate()
  if (favorites.state === 'loading') {
    return <Loader />;
  }

  return (
    <div className="profile-favorites">
      <div className="profile-favorites__header">
        <h1>Избранное</h1>
      </div>
      {Object.values(favorites?.data).length > 0 ? ( <>
        <CategoriesBar
        atom={favoriteCategoriesAtom}
        selectedCategoryAtom={selectedFavoriteCategoryAtom}
        selectedInnerCategoryAtom={null}
      />

        <CategorySection dataAtom={favoritesAtom} categoriesAtom={favoriteCategoriesAtom} selectedCategoryAtom={selectedFavoriteCategoryAtom} type={'favorites'}/>
      </>):<div className={'empty-cont'}> <EmptyEstablishments mainLabel={'В избранном пока пусто'} secondLabel={'Добавляйте понравившиеся места и они появятся здесь'} onClick={()=>navigate('/')} /></div>}
    </div>
  );
};

export default ProfileFavorites;