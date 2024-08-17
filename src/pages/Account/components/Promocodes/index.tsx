import PromoCodeModal from '../../../../components/PromoCodeModal';
import EmptyEstablishments from '../../../../components/EmptyEstablishments';
import PromoCodeItem from './components/PromocodeItem';
import {
  promoCodeCategoriesAtom,
  promoCodesAtom, receivePromoCodeAtom,
  selectedPromoCodeAtom,
  selectedPromoCodeCategoryAtom,
} from './promocodes.atoms.ts';
import { useAtom } from 'jotai';
import CategoriesBar from '../../../Main/components/CategoriesBar';
import './Promocodes.scss'

const ProfilePromoCodes: React.FC = () => {
  const [selectedPromoCode, setSelectedPromoCode] = useAtom(selectedPromoCodeAtom);
  const [promoCodes] = useAtom(promoCodesAtom);
  const [, receivePromoCode] = useAtom(receivePromoCodeAtom);

  const handleGetPromoCode = async () => {
    if (selectedPromoCode) {
      const success = await receivePromoCode(selectedPromoCode);
      if (!success) {
        console.error('Failed to receive promo code');
      }
    }
  };



  return (
    <div className="profile-promo-codes">
      <div className="profile-promo-codes__header">
        <h1>Промокоды</h1>
      </div>

      <CategoriesBar
        atom={promoCodeCategoriesAtom}
        selectedCategoryAtom={selectedPromoCodeCategoryAtom}
        selectedInnerCategoryAtom={null}
      />

      {promoCodes.state === 'hasData' && promoCodes.data.length > 0 ? (
        <div className="profile-promo-codes__list">
          {promoCodes.data.map(promoCode => (
            <PromoCodeItem
              key={promoCode.id}
              promoCode={promoCode}
              onClick={() => setSelectedPromoCode(promoCode)}
            />
          ))}
        </div>
      ) : (
        <EmptyEstablishments
          mainLabel="У вас пока нет промокодов"
          secondLabel="Промокоды появятся здесь, когда вы их получите"
        />
      )}

      {selectedPromoCode && (
        <PromoCodeModal
          promoCode={selectedPromoCode}
          onClose={() => setSelectedPromoCode(null)}
          onPromoCodeReceived={handleGetPromoCode}
        />
      )}
    </div>
  );
};

export default ProfilePromoCodes