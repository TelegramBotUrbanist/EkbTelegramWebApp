import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAtom } from 'jotai/index';
import { establishmentIdAtom } from '../../../pages/Establishment/components/Details/details.atoms.ts';

const Index = () => {
  debugger
  const { id } = useParams();
  const [, setEstablishmentId] = useAtom(establishmentIdAtom);

  useEffect(() => {
    if (id) {
      setEstablishmentId(parseInt(id, 10)); // Устанавливаем ID заведения
    }

    return () => {
      setEstablishmentId(null); // Сбрасываем ID при размонтировании
    };
  }, [id, setEstablishmentId]);

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default Index;