import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { establishmentAtom, establishmentIdAtom } from '../../../Establishment/components/Details/details.atoms.ts';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import { eventAtom } from '../../events.atoms.ts';
import EstablishmentDetails from '../../../Establishment/components/Details';
import Loader from '../../../../shared/Loader';

const Index = () => {
  const { id } = useParams();
  const [, setEstablishmentId] = useAtom(establishmentIdAtom);
  const { data: event, loading, error } = useLoadableAtom(eventAtom);


  useEffect(() => {
    if (id) {
      setEstablishmentId(parseInt(id, 10)); // Устанавливаем ID заведения
    }

    return () => {
      setEstablishmentId(null); // Сбрасываем ID при размонтировании
    };
  }, [id, setEstablishmentId]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return <>
    <EstablishmentDetails data={event} type={'events'}  id={parseInt(id, 10)} />
    {/*<Outlet/>*/}
  </>;
};

export default Index;