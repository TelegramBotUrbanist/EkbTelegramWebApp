import React, { startTransition, useEffect } from 'react';
import CustomInput from '../../../../shared/Input';
import Calendar from '../../../../components/Calendar';
import Header from '../Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom.ts';
import { currentTableValueAtom, fetchCurrentTable, tablesForDateAtom } from '../../book.atoms.ts';
import './CreateBook.scss'
import ImageSlider from '../../../../components/ImageSlider';
import { useAtom, useAtomValue } from 'jotai';
import Button from '../../../../shared/Button';
import { establishmentAtom } from '../../../Establishment/components/Details/details.atoms.ts';
import { LoadingProvider } from '../../../../providers/LoadingProvider.tsx';
import BookingList from './components/BookingList.tsx';
const CreateBook = () => {
  const {id,tableId} = useParams()
  const [currentTable,setCurrentTable] = useAtom(currentTableValueAtom)
  // const [currentTable,getCurrentTable] = useAtom(fetchCurrentTable)
  const navigate = useNavigate()
  const {data,loading,error} = useLoadableAtom<any>(fetchCurrentTable,[currentTable.id])



  if(loading) return <></>



  return (
    <LoadingProvider isLoading={loading} isError={error}>
    <div className={'book_info'}>
      <Header title={`Столик № ${data?.table.tableName}`} cls={'header'}/>
      <BookingList bookings={data?.table.bookings}/>
      <div className={'book_info__image-container'}>
        <ImageSlider images={data?.table.photoUrls?.map(el=>el.imgUrl)}/>
      </div>
      <p className='book_info__description'>{data?.table.locationDescription}</p>
      <div className={'buttonContainer'}>
        {!currentTable.occupied && <Link to={`establishment/${id}/book/info`}>
        <Button type="primary">Далее</Button>
      </Link>}
      </div>

    </div>
    </LoadingProvider>
  );
};

export default CreateBook;