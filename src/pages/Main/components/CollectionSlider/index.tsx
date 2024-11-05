import React from 'react';
import { Atom, useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import './CollectionSlider.scss';
import GenericSlider from '../../../../components/GenericSlider';
interface IProps{
  collectionsAtom:Atom<any>
  type:'establishments' | 'events'
}
const CollectionSlider: React.FC<IProps> = ({collectionsAtom,type}) => {
  const collections = useAtomValue(collectionsAtom);

  return <GenericSlider label="Подборки" items={collections} type={type} />;
};

export default CollectionSlider;
