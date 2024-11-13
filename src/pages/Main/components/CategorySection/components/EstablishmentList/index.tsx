import React from 'react';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import EstablishmentCard from '../EstablishmentCard';
import '../../CategorySection.scss'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface EstablishmentListProps {
  establishments: FoodEstablishmentInfoDto[];
  direction: 'x' | 'y';
  [x:string]:unknown
  type:'establishments' | 'events' | 'account'
}

const EstablishmentList: React.FC<EstablishmentListProps> = ({ establishments,type, direction,...rest }) => {
  return (
    <motion.div
      drag={direction==='x' ? 'x' : false}
      dragConstraints={direction === 'y' ? {} : { left: -200, right: 0 }}
      dragElastic={0.05}
      whileTap={{ cursor: "grabbing" }}
      className="establishment-list detailed">
      {establishments?.map((establishment) => (
        // <Link to={`/restaurant/${restaurant.id}`}>
        //   {restaurant.title}
        // </Link>
        // <Link to={type === 'account' ? `${establishment.type}/${establishment.id}` : type === 'establishments' ? `/establishment/${0}` : `/events/${0}`} className={'card'}>
          <EstablishmentCard  type={type} onLikeClick={()=>console.log(`${type} liked, ${establishment?.inFavorites}`)} isDetailed={rest.isDetailed} key={establishment.id} establishment={establishment} />
        // </Link>
      ))}
    </motion.div>
  );
};

export default EstablishmentList;
