import React from 'react';
import { FoodEstablishmentInfoDto } from '../../categorySection.types.ts';
import EstablishmentCard from '../EstablishmentCard';
import '../../CategorySection.scss'
import { motion } from 'framer-motion';

interface EstablishmentListProps {
  establishments: FoodEstablishmentInfoDto[];
  direction: 'x' | 'y';
  [x:string]:unknown
}

const EstablishmentList: React.FC<EstablishmentListProps> = ({ establishments, direction,...rest }) => {
  return (
    <motion.div
      drag={direction==='x' ? 'x' : false}
      dragConstraints={direction === 'y' ? {} : { left: -200, right: 0 }}
      dragElastic={0.05}
      whileTap={{ cursor: "grabbing" }}
      className="establishment-list detailed">
      {establishments?.map((establishment) => (
        <EstablishmentCard isDetailed={rest.isDetailed} key={establishment.id} establishment={establishment} />
      ))}
    </motion.div>
  );
};

export default EstablishmentList;
