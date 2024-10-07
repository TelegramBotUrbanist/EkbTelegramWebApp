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
const CreateBook = () => {
  const {id,tableId} = useParams()
  const [currentTableId,setCurrentTable] = useAtom(currentTableValueAtom)
  // const [currentTable,getCurrentTable] = useAtom(fetchCurrentTable)
  const navigate = useNavigate()
  const {data,loading,error} = useLoadableAtom<any>(fetchCurrentTable,[currentTableId])
  useEffect(() => {
    startTransition(()=> {
        tableId !== null && setCurrentTable(Number(tableId))
      }
    )
  }, []);

  // useEffect(()=>{
  //   startTransition(()=> {
  //     getCurrentTable()
  //   })
  // },[currentTableId])

  console.log(data,'data');
  if(loading) return <></>



  return (
    <div className={'book_info'}>
      1234
      <Header title={'Kitchen'} onClose={()=>navigate(`establishment/${id}`)}/>
      <Header title={`Столик № ${data?.table.title}`} cls={'header'}/>
      <div className={'book_info__image-container'}>
        <ImageSlider images={data?.table.imgs.map(el=>el.imageUrl)}/>
      </div>
      <p className='book_info__description'>{data?.table.description}</p>
      <div className={'buttonContainer'}>
      <Link to={`establishment/${id}/book/info`}>
        <Button type="primary">Далее</Button>
      </Link>
      </div>
      {/*<CustomInput*/}
      {/*  label={'Выберите дату'}*/}
      {/*  value={null}*/}
      {/*  onChange={() => {}}*/}
      {/*  type="date"*/}
      {/*  // placeholder="Количество гостей"*/}

      {/*  // onEditClick={handleCopyClick} // Кнопка для копирования*/}
      {/*/>*/}
      {/*<Calendar value={null} onChange={()=>{}}></Calendar>*/}
      {/*<CustomInput*/}
      {/*  label={'Количество гостей'}*/}
      {/*  value={1}*/}
      {/*  onChange={() => {}}*/}
      {/*  type="number"*/}
      {/*  placeholder="Количество гостей"*/}

      {/*  // onEditClick={handleCopyClick} // Кнопка для копирования*/}
      {/*/>*/}

    </div>
  );
};

export default CreateBook;