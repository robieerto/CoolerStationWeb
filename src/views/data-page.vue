<script setup>
import 'devextreme/data/odata/store';
import DxDataGrid, { DxColumn, DxFilterRow, DxPager, DxPaging, DxExport } from 'devextreme-vue/data-grid';
import DxDateBox from 'devextreme-vue/date-box';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

import { reactive } from 'vue';
import { ref, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';
import { db } from '@/firebase';
import { floatFormat, dateFormat, toCustomDate, getTomorrow } from '@/utils/helpers';

const dataPath = 'ESPData/ESP32-6413A8E350CC/Data';

const actualDate = new Date(new Date().setUTCHours(0, 0, 0, 0));

const state = reactive({
  dataSource: [],
  dataGridInstance: null,
  selectedDate: actualDate,
});

const processDataSource = (data) => {
  state.dataSource = Object.keys(data)
    .map((key, idx) => ({
      id: idx,
      ...{
        ...data[key],
        energiaAktualna: data[key].energiaAktualna * 277.778,
        energiaCelkovo: data[key].energiaCelkovo * 277.778,
        energiaVyrobena1: data[key].energiaVyrobena1 * 10,
        energiaVyrobena2: data[key].energiaVyrobena2 * 10,
        energiaVyrobenaCelkovo: data[key].energiaVyrobenaCelkovo * 10,
        cas: data[key].cas,
      },
    }))
    .reverse();
  // .filter((record) => new Date(record.cas).toDateString() === state.selectedDate.toDateString())
  // .reverse()
  // .sort((a, b) => new Date(b.cas) - new Date(a.cas));
};

const dbQuery = () => {
  const startDate = toCustomDate(state.selectedDate);
  const endDate = toCustomDate(getTomorrow(state.selectedDate));
  return query(ref(db, dataPath), orderByChild('cas'), startAt(startDate), endAt(endDate));
};

const getData = () => {
  onValue(
    dbQuery(),
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        processDataSource(data);
      }
    },
    {
      onlyOnce: true,
    }
  );
};

onValue(dbQuery(), (snapshot) => {
  if (new Date(state.selectedDate).toDateString() !== actualDate.toDateString()) {
    return;
  }
  if (snapshot.exists()) {
    const data = snapshot.val();
    processDataSource(data);
  }
});

function onDataGridInitialized(e) {
  state.dataGridInstance = e.component;
}

const onSelectedDate = () => {
  getData();
};

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Data');

  exportDataGrid({
    component: e.component,
    worksheet,
    topLeftCell: { row: 1, column: 1 },
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      const isoDate = state.selectedDate.toISOString().split('T')[0];
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `data-${isoDate}.xlsx`);
    });
  });

  e.cancel = true;
};
</script>

<template>
  <div>
    <div class="content-block mt-0">
      <div class="col-sm-auto">
        <div>
          <h2>Dáta</h2>
        </div>
      </div>
      <div class="col-sm-3 mt-3 mb-3">
        <div>
          <DxDateBox v-model="state.selectedDate" :input-attr="{ 'aria-label': 'Date' }" type="date" :max="actualDate" :on-value-changed="onSelectedDate" />
        </div>
      </div>
    </div>

    <DxDataGrid
      class="dx-card wide-card"
      :data-source="state.dataSource"
      :key-expr="'id'"
      :width="'100%'"
      :show-borders="false"
      :focused-row-index="0"
      :focused-row-enabled="true"
      :auto-navigate-to-focused-row="false"
      :column-auto-width="true"
      :show-column-lines="true"
      :show-row-lines="true"
      :word-wrap-enabled="true"
      @exporting="onExporting"
      @initialized="onDataGridInitialized"
    >
      >
      <DxExport :enabled="true" />
      <DxPaging :page-size="10" />
      <DxPager :show-page-size-selector="true" :show-info="true" />
      <DxFilterRow :visible="true" />
      <DxColumn data-field="id" caption="Id" :visible="false" />
      <DxColumn data-field="rok" caption="Rok" :visible="false" />
      <DxColumn data-field="mesiac" caption="Mesiac" :visible="false" />
      <DxColumn data-field="den" caption="Deň" :visible="false" />
      <DxColumn data-field="cas" caption="Čas" data-type="datetime" :format="dateFormat" :editor-options="{ max: actualDate }" :fixed="true" :width="190" />
      <DxColumn data-field="energiaCelkovo" caption="Energia celkovo (kW/h)" data-type="number" :format="floatFormat" />
      <DxColumn data-field="energiaVyrobena1" caption="Spotreba energie 1 (kW/h)" data-type="number" :format="floatFormat" />
      <DxColumn data-field="energiaVyrobena2" caption="Spotreba energie 2 (kW/h)" data-type="number" :format="floatFormat" />
      <DxColumn data-field="energiaVyrobenaCelkovo" caption="Spotreba energie spolu (kW/h)" data-type="number" :format="floatFormat" />
      <DxColumn data-field="teplotaVonkajsia" caption="Teplota vonkajšia (°C)" data-type="number" :format="floatFormat" />
    </DxDataGrid>
  </div>
</template>
