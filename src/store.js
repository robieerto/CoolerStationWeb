import { reactive, watch } from 'vue';
import { query, onValue, orderByChild, startAt, endAt } from 'firebase/database';
import { actualDate, toCustomDate, getTomorrow } from '@/utils/helpers';
import { dbRef } from '@/firebase';

const store = reactive({
  dataSource: [],
  selectedDate: actualDate,
});

const processDataSource = (data) => {
  store.dataSource = Object.keys(data).map((key, idx) => ({
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

const dbQuery = () => {
  const startDate = toCustomDate(store.selectedDate);
  const endDate = toCustomDate(getTomorrow(store.selectedDate));
  return query(dbRef, orderByChild('cas'), startAt(startDate), endAt(endDate));
};

const getDataSource = () => {
  onValue(
    dbQuery(),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        processDataSource(data);
      } else {
        store.dataSource = [];
      }
    },
    {
      onlyOnce: true,
    }
  );
};

onValue(dbQuery(), (snapshot) => {
  if (new Date(store.selectedDate).toDateString() !== actualDate.toDateString()) {
    return;
  }
  if (snapshot.exists()) {
    const data = snapshot.val();
    processDataSource(data);
  }
});

watch(
  () => store.selectedDate,
  () => {
    getDataSource();
  }
);

export default store;
