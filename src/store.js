import { reactive, watch } from 'vue';
import { query, onValue, orderByChild, startAt, endAt, limitToLast } from 'firebase/database';
import { actualDate, months, toCustomDate, getTomorrow, toStrDateValue } from '@/utils/helpers';
import { dbRef } from '@/firebase';

const store = reactive({
  dataSource: [],
  dailyDataSource: [],
  selectedDate: actualDate,
  selectedMonth: months[actualDate.getMonth()],
  selectedYear: actualDate.getFullYear(),
  isListenerAdded: false,
  isDailyDataLoaded: false,
  loading: true,
});

const processDataSource = (data) => {
  store.loading = false;
  return Object.keys(data).map((key, idx) => ({
    id: idx,
    ...{
      ...data[key],
      energiaAktualna: data[key].energiaAktualna * 277.778,
      energiaCelkovo: data[key].energiaCelkovo * 277.778,
      energiaVyrobena1: data[key].energiaVyrobena1 * 10,
      energiaVyrobena2: data[key].energiaVyrobena2 * 10,
      energiaVyrobenaCelkovo: data[key].energiaVyrobenaCelkovo * 10,
    },
  }));
};

const dbQuery = (date) => {
  const startDate = toCustomDate(date);
  const endDate = toCustomDate(getTomorrow(date));
  return query(dbRef, orderByChild('cas'), startAt(startDate), endAt(endDate));
};

const dbDailyQuery = (date) => {
  const startDate = toCustomDate(date);
  const endDate = toCustomDate(getTomorrow(date));
  return query(dbRef, orderByChild('cas'), startAt(startDate), endAt(endDate), limitToLast(1));
};

const getDataSource = () => {
  store.loading = true;
  onValue(
    dbQuery(store.selectedDate),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        store.dataSource = processDataSource(data);
      } else {
        store.dataSource = [];
      }
    },
    {
      onlyOnce: true,
    }
  );
};

const getDailyDataSource = () => {
  store.loading = true;
  const dailyDataSource = [];
  const year = store.selectedYear;
  const month = months.findIndex((m) => m === store.selectedMonth) + 1;
  const monthStr = toStrDateValue(month);
  const lastDayOfMonth = actualDate.getFullYear() == year && actualDate.getMonth() + 1 == month ? actualDate.getDate() - 1 : new Date(year, month, 0).getDate();
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const dayStr = toStrDateValue(i);
    const date = new Date(`${year}-${monthStr}-${dayStr}`);
    onValue(
      dbDailyQuery(date),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dailyDataSource.push(Object.values(data)[0]);
        }
        if (i == lastDayOfMonth) {
          store.dailyDataSource = processDataSource(dailyDataSource);
        }
      },
      {
        onlyOnce: true,
      }
    );
  }
};

const initDailyData = () => {
  if (!store.isDailyDataLoaded) {
    store.isDailyDataLoaded = true;
    getDailyDataSource();
  }
};

const addDataListener = () => {
  if (!store.isListenerAdded) {
    store.isListenerAdded = true;
    onValue(dbQuery(store.selectedDate), (snapshot) => {
      if (new Date(store.selectedDate).toDateString() !== actualDate.toDateString()) {
        return;
      }
      if (snapshot.exists()) {
        const data = snapshot.val();
        store.dataSource = processDataSource(data);
      }
    });
  }
};

watch(
  () => store.selectedDate,
  () => {
    getDataSource();
  }
);

watch(
  () => [store.selectedMonth, store.selectedYear],
  () => {
    getDailyDataSource();
  }
);

export { store as default, addDataListener, initDailyData };
