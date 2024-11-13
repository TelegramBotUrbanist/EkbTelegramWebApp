import React from 'react';
import { useAtomValue } from 'jotai';

import './AccountPage.scss';
import {
  accountCategoriesAtom, accountDataAtom,
   selectedAccountCategoryAtom, selectedAccountSubcategoryAtom,

  userProfileAtom,
} from './account.atom.ts';
import Button from '../../shared/Button';
import CategoriesBar from '../Main/components/CategoriesBar';
import EstablishmentList from '../Main/components/CategorySection/components/EstablishmentList';
import { mapReservationToEstablishment } from '../../utils/reservation.ts';
import { useLoadableAtom } from '../../hooks/useLoadableAtom.ts';
import Loader from '../../shared/Loader';
import { useNavigate } from 'react-router-dom';
import CategorySection from '../Main/components/CategorySection';

const AccountPage = () => {
  const { data:accountState,state, } = useAtomValue(accountDataAtom);
  const userProfile = useAtomValue(userProfileAtom);
  const navigate = useNavigate()
  if (state==='loading')  return <Loader/>
  debugger

  const hasReservations = Object.values(accountState).length > 0;

  return (
    <div className="account-page">
      <div className="profile-header">
        <img
          src={userProfile.photoUrl || '/default-avatar.png'}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{userProfile.displayName}</h2>
          <span className="username">{userProfile.username}</span>
        </div>
      </div>
      <div className={'profile-buttons'}>
        <Button onClick={()=>navigate('/profile/favorites')} type={'secondary'}>
          <img src={'/profile-heart-icon.svg'}/>
          <span>Избранное</span>
        </Button>
        <Button onClick={()=>navigate('/profile/promocodes')} type={'secondary'}>
          <img src={'/profile-promo-icon.svg'} />
          <span>Промокоды</span>
        </Button>
      </div>

      <div className="reservations-section">
        <h3>Бронь</h3>
        {hasReservations ? (
          <>
            <CategoriesBar
              atom={accountCategoriesAtom}
              selectedCategoryAtom={selectedAccountCategoryAtom}
              selectedInnerCategoryAtom={selectedAccountSubcategoryAtom}
            />
            <CategorySection
              dataAtom={accountDataAtom}
              categoriesAtom={accountCategoriesAtom}
              selectedCategoryAtom={selectedAccountCategoryAtom}
              type="account"
            />
          </>
        ) : (
          <div className="empty-state">
           <div className={'empty-state--container'}>
             <img className={'empty-state--container-image'} src={'/empty_reservation.gif'}/>
             <div className={'empty-state--container-empty'}>Забронированных мест пока нет...</div>
             <div className={'empty-state--container-empty-label'}>
               Откройте для себя новое местечко для отдыха или забронируйте столик в уже любимом ресторане.
             </div>
             <div className={'empty-state--container-button'}>
               <Button onClick={()=>navigate('/')} type={'primary'} >
                 Посмотреть места
               </Button>
             </div>
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;