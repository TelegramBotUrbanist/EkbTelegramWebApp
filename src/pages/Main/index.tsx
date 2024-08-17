import ImageSlider from './components/ImageSlider';
import { List, Section } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import CollectionSlider from './components/CollectionSlider';
import './main.scss';

const MainPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <div>
          {/* Скриншоты показывают секции, которые можно превратить в скелетоны */}
          <Skeleton height={30} width={200} />
          <Skeleton height={200} />
          <Skeleton height={20} width={`60%`} />
          <Skeleton height={20} width={`80%`} />
          <Skeleton height={20} width={`40%`} />
        </div>
      ) : (
        <>
          <ImageSlider />

          <List className={'main__page'}>
            <CollectionSlider />
          </List>
        </>
      )}
    </>
  );
};

export default MainPage;
