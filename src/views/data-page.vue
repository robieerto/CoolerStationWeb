<script setup>
import 'devextreme/data/odata/store';
import DxDataGrid, { DxColumn, DxFilterRow, DxPager, DxPaging, DxExport } from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

import { reactive } from 'vue';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';
import { floatFormat, dateFormat } from '@/utils/helpers';

const state = reactive({
  dataSource: [],
});

const dbRef = ref(db, 'ESPData/ESP32-6413A8E350CC/Data');
onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    state.dataSource = Object.keys(data)
      .map((key, idx) => ({
        id: idx,
        ...{
          ...data[key],
          energiaVyrobena1: data[key].energiaVyrobena1 * 10,
          energiaVyrobena2: data[key].energiaVyrobena2 * 10,
          energiaVyrobenaCelkovo: data[key].energiaVyrobenaCelkovo * 10,
        },
      }))
      .reverse();
  } else {
    console.log('No data available');
  }
});

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Data');

  exportDataGrid({
    component: e.component,
    worksheet,
    topLeftCell: { row: 1, column: 1 },
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Data.xlsx');
    });
  });

  e.cancel = true;
};
</script>

<template>
  <div>
    <h2 class="content-block">Dáta</h2>

    <dx-data-grid
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
    >
      >
      <dx-export :enabled="true" />
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-filter-row :visible="true" />
      <dx-column data-field="id" caption="Id" :visible="false" />
      <dx-column data-field="rok" caption="Rok" :visible="false" />
      <dx-column data-field="mesiac" caption="Mesiac" :visible="false" />
      <dx-column data-field="den" caption="Deň" :visible="false" />
      <dx-column data-field="cas" caption="Čas" data-type="datetime" :format="dateFormat" :fixed="true" />
      <dx-column data-field="energiaCelkovo" caption="Energia celkovo (GJ)" data-type="number" :format="floatFormat" />
      <dx-column data-field="energiaVyrobena1" caption="Energia vyrobená 1 (kW/h)" data-type="number" :format="floatFormat" />
      <dx-column data-field="energiaVyrobena2" caption="Energia vyrobená 2 (kW/h)" data-type="number" :format="floatFormat" />
      <dx-column data-field="energiaVyrobenaCelkovo" caption="Energia vyrobená spolu (kW/h)" data-type="number" :format="floatFormat" />
      <dx-column data-field="teplotaVonkajsia" caption="Teplota vonkajšia (°C)" data-type="number" :format="floatFormat" />
    </dx-data-grid>
  </div>
</template>
