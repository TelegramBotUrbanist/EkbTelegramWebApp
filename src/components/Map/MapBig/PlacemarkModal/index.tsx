import React, { useEffect } from 'react';
import { Sheet, SheetRef } from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import './PlacemarkModal.scss';
import {
  establishmentAtom,
  establishmentIdAtom,
} from '../../../../pages/Establishment/components/Details/details.atoms.ts';
import { eventAtom } from '../../../../pages/Events/events.atoms.ts';
import Loader from '../../../../shared/Loader';
import MainInfoComponent from '../../../../pages/Establishment/components/Details/components/MainInfo';
import DescriptionComponent from '../../../../pages/Establishment/components/Details/components/Description';
import Button from '../../../../shared/Button';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';

interface PlacemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeData: {
    id: number;
    type: 'FOOD_ESTABLISHMENT' | 'EVENT';
    title: string;
    rating?: number;
    image: {
      url: string;
    };
    categoryInfoDto: {
      id: number;
      title: string;
    };
  };
}

const PlacemarkModal: React.FC<PlacemarkModalProps> = ({ isOpen, onClose, placeData }) => {
  const navigate = useNavigate();
  const { data: establishmentData, loading: establishmentLoading } = useLoadableAtom(establishmentAtom);
  const [, setEstablishmentId] = useAtom(establishmentIdAtom);
  const { data: eventData, loading: eventLoading } = useLoadableAtom(eventAtom);
  const detailData = placeData.type === 'FOOD_ESTABLISHMENT' ? establishmentData : eventData;
  const isLoading = establishmentLoading || eventLoading;
  debugger

  useEffect (() => {
    setEstablishmentId(placeData?.id)
  }, [placeData]);
  const handleNavigateToDetails = () => {
    const path = placeData.type === 'FOOD_ESTABLISHMENT'
      ? `/establishment/${placeData.id}`
      : `/events/${placeData.id}`;
    navigate(path);
    onClose();
  };

  return (
    <div className={"modal-wrapper"}>
      {isOpen && (
        <div className="background-image">
          <img
            src={placeData.image.url}
            alt={placeData.title}
            className="background-image__img"
          />
          {placeData.type === 'FOOD_ESTABLISHMENT' && placeData.rating && (
            <div className="background-image__rating">{placeData.rating}</div>
          )}
        </div>
      )}
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[240]}
        initialSnap={0}
        disableDrag={true}
      >
        <Sheet.Container>
          <div className="placemark-modal">


            <div className="placemark-modal__content">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <MainInfoComponent
                    mainCategory={detailData.categoryInfoDto}
                  innerCategory={detailData.innerCategoryInfo}
                  costLevel={detailData.costLevel}
                  title={detailData.title}
                  address={detailData.locationInfo}
                  hours={{
                    openingHours: detailData.openingHours,
                    dateTime: detailData.dateTime,
                    startDate: detailData.startDate,
                    endDate: detailData.endDate
                  }}
                  type={detailData.type}
                />
                <DescriptionComponent description={detailData.description} />
                <Button
                  type="primary"
                  onClick={handleNavigateToDetails}
                  className="placemark-modal__button"
                >
                  Подробнее
                </Button>
              </>
            )}
          </div>
        </div>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
    </div>
  );
};

export default PlacemarkModal;