import React from 'react';
import { Atom, useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import './CollectionSlider.scss';
import { collectionsAtom } from './slider.atoms.ts';
import GenericSlider from '../../../../components/GenericSlider';
interface IProps{
  collectionsAtom:Atom<any>
}
const CollectionSlider: React.FC<IProps> = ({collectionsAtom}) => {
  const collections = useAtomValue(collectionsAtom);

  return <GenericSlider label="Подборки" items={collections} />;
};

export default CollectionSlider;
