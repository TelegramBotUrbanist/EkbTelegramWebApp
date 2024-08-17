import { useEffect, useState } from 'react';
import { useAtomValue, Atom } from 'jotai';
import { loadable } from 'jotai/utils';

type UseLoadableAtomResult<T> = {
  data: T | null;        // Данные, если они загружены
  loading: boolean;      // Статус загрузки
  error: string | null;  // Сообщение об ошибке
};

type UseLoadableAtomOptions = {
  enabled?: boolean;  // Включена ли загрузка данных
};

export function useLoadableAtom<T>(
  atomToLoad: Atom<Promise<T>>,  // Атом для загрузки данных
  dependencies: any[] = [],      // Массив зависимостей
  options: UseLoadableAtomOptions = {}  // Объект опций
): UseLoadableAtomResult<T> {
  const { enabled = true } = options;  // Значение по умолчанию для опции `enabled`
  const loadableAtom = loadable(atomToLoad);  // Оборачиваем атом в loadable
  const loadableValue = useAtomValue(loadableAtom);

  const [reload, setReload] = useState(0); // Состояние для перезагрузки

  useEffect(() => {
    // Перезагружаем данные при изменении зависимостей, если enabled=true
    if (enabled) {
      setReload(reload => reload + 1);
    }
  }, dependencies);

  // Если загрузка отключена
  if (!enabled) {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }

  // Если идет загрузка
  if (loadableValue.state === 'loading') {
    return {
      data: null,
      loading: true,
      error: null,
    };
  }

  // Если произошла ошибка
  if (loadableValue.state === 'hasError') {
    return {
      data: null,
      loading: false,
      error: loadableValue.error.message,
    };
  }

  // Если данные загружены
  return {
    data: loadableValue.data,
    loading: false,
    error: null,
  };
}
