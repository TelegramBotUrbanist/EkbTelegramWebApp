import React from 'react';
import Header from '../Header';
import TableCard from '../TableCard';
import { useLoadableAtom } from '../../../../hooks/useLoadableAtom';
import { currentTableValueAtom, tablesForDateAtom } from '../../book.atoms';
import { LoadingProvider } from '../../../../providers/LoadingProvider';
import { useNavigate, useParams } from 'react-router-dom';
import './tables.scss';
import { useSetAtom } from 'jotai';

const Index = () => {
  const { id } = useParams();
  const { data: tablesData, loading: tablesLoading } = useLoadableAtom(tablesForDateAtom, []);
  const setCurrentTable = useSetAtom(currentTableValueAtom)
  const navigate = useNavigate();
  const handleNavigateToTable = (table) => {
    navigate(`establishment/${id}/book/tables/${table.id}`)
    setCurrentTable(table)
  }
  console.log(tablesData);
  return (
    <LoadingProvider isLoading={tablesLoading}>
      <Header title="Столы" cls="header" />
      <div className="tables">
        {tablesData?.map((table) => (
          <TableCard
            onClick={() => handleNavigateToTable(table)}
            key={table.tableName}
            table={table}
          />
        ))}
      </div>
    </LoadingProvider>
  );
};

export default Index;