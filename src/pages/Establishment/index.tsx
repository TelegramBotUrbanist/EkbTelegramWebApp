import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import EstablishmentDetails from './components/Details';
import { useAtom } from 'jotai';
import { establishmentAtom, establishmentIdAtom } from './components/Details/details.atoms.ts';
import Loader from '../../shared/Loader';
import { useLoadableAtom } from '../../hooks/useLoadableAtom.ts';

const EstablishmentPage = () => {
  debugger
  const { id } = useParams();
  const [, setEstablishmentId] = useAtom(establishmentIdAtom);
  const { data: establishment, loading, error } = useLoadableAtom(establishmentAtom);


  useEffect(() => {
    if (id) {
      setEstablishmentId(parseInt(id, 10)); // Устанавливаем ID заведения
    }

    // return () => {
    //   setEstablishmentId(null); // Сбрасываем ID при размонтировании
    // };
  }, [id, setEstablishmentId]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return <>
    <EstablishmentDetails data={establishment} type={'establishment'}  id={parseInt(id, 10)} />
    {/*<Outlet/>*/}
  </>;
};

export default EstablishmentPage;