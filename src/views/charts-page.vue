<script setup>
import 'devextreme/data/odata/store';
import DxChart, { DxValueAxis, DxArgumentAxis, DxCommonPaneSettings, DxGrid, DxSeries, DxLegend, DxSize, DxBorder, DxLabel, DxTooltip, DxExport, DxLoadingIndicator } from 'devextreme-vue/chart';
import DxDateBox from 'devextreme-vue/date-box';

import { reactive, watch } from 'vue';
import { ref, onValue, get, child } from 'firebase/database';
import { db } from '@/firebase';
import { toFloatNumber } from '@/utils/helpers';

const dataPath = 'ESPData/ESP32-6413A8E350CC/Data';

const actualDate = new Date();

const state = reactive({
  dataSource: [],
  selectedDate: actualDate,
});

const dbRef = ref(db, dataPath);

const processDataSource = (data) => {
  state.dataSource = Object.keys(data)
    .map((key, idx) => ({
      id: idx,
      ...{
        ...data[key],
        energiaVyrobena1: data[key].energiaVyrobena1 * 10,
        energiaVyrobena2: data[key].energiaVyrobena2 * 10,
        energiaVyrobenaCelkovo: data[key].energiaVyrobenaCelkovo * 10,
        cas: data[key].cas,
      },
    }))
    .filter((record) => new Date(record.cas).toDateString() === state.selectedDate.toDateString());

  state.dataSource = state.dataSource.map((record, idx) => {
    if (idx) {
      if (record.energiaVyrobena1 < state.dataSource[idx - 1].energiaVyrobena1) {
        record.energiaVyrobena1 = undefined;
      }
      if (record.energiaVyrobena2 < state.dataSource[idx - 1].energiaVyrobena2) {
        record.energiaVyrobena2 = undefined;
      }
      if (record.energiaVyrobenaCelkovo < state.dataSource[idx - 1].energiaVyrobenaCelkovo) {
        record.energiaVyrobenaCelkovo = undefined;
      }
      if (record.teplotaVonkajsia > 100) {
        record.teplotaVonkajsia = undefined;
      }
    }
    return record;
  });
};

onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    processDataSource(data);
  }
});

const getData = () => {
  const dbRef = ref(db);
  get(child(dbRef, dataPath))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        processDataSource(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

watch(
  () => state.selectedDate,
  () => {
    getData();
  }
);

const customizeTimeAxisLabel = ({ valueText }) => new Date(valueText).toLocaleTimeString('sk-SK');
</script>

<template>
  <div>
    <div class="content-block mt-0">
      <div class="col-sm-auto">
        <div>
          <h2>Grafy</h2>
        </div>
      </div>
      <div class="col-sm-3 mt-3 mb-3">
        <div>
          <DxDateBox v-model="state.selectedDate" :input-attr="{ 'aria-label': 'Date' }" type="date" :max="actualDate" />
        </div>
      </div>
    </div>

    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia celkovo'">
        <!-- :common-series-settings="{ point: { visible: false } }" -->
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} GJ`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxGrid :visible="true" :opacity="0.5" />
          <DxLabel :customize-text="customizeTimeAxisLabel" />
        </DxArgumentAxis>
        <DxCommonPaneSettings>
          <DxBorder :visible="true" :width="2" :top="false" :right="false" />
        </DxCommonPaneSettings>
        <DxSeries argument-field="cas" value-field="energiaCelkovo" type="spline" color="#1DB2F5" />
        <DxLegend :visible="false" />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="
            ({ valueText }) => ({
              text: `${toFloatNumber(valueText, 2)} GJ`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia vyrobená 1'">
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} kW/h`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxLabel :customize-text="customizeTimeAxisLabel" />
          <DxGrid :visible="true" :opacity="0.5" />
        </DxArgumentAxis>
        <DxCommonPaneSettings>
          <DxBorder :visible="true" :width="2" :top="false" :right="false" />
        </DxCommonPaneSettings>
        <DxSeries argument-field="cas" value-field="energiaVyrobena1" type="spline" color="#CC1DF5" />
        <DxLegend :visible="false" />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="
            ({ valueText }) => ({
              text: `${toFloatNumber(valueText, 2)} kW/h`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia vyrobená 2'">
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} kW/h`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxLabel :customize-text="customizeTimeAxisLabel" />
          <DxGrid :visible="true" :opacity="0.5" />
        </DxArgumentAxis>
        <DxCommonPaneSettings>
          <DxBorder :visible="true" :width="2" :top="false" :right="false" />
        </DxCommonPaneSettings>
        <DxSeries argument-field="cas" value-field="energiaVyrobena2" type="spline" color="#46F51D" />
        <DxLegend :visible="false" />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="
            ({ valueText }) => ({
              text: `${toFloatNumber(valueText, 2)} kW/h`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia vyrobená spolu'">
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} kW/h`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxLabel :customize-text="customizeTimeAxisLabel" />
          <DxGrid :visible="true" :opacity="0.5" />
        </DxArgumentAxis>
        <DxCommonPaneSettings>
          <DxBorder :visible="true" :width="2" :top="false" :right="false" />
        </DxCommonPaneSettings>
        <DxSeries argument-field="cas" value-field="energiaVyrobenaCelkovo" type="spline" color="#F5601D" />
        <DxLegend :visible="false" />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="
            ({ valueText }) => ({
              text: `${toFloatNumber(valueText, 2)} kW/h`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Teplota vonkajšia'">
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} &#176;C`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxLabel :customize-text="customizeTimeAxisLabel" />
          <DxGrid :visible="true" :opacity="0.5" />
        </DxArgumentAxis>
        <DxCommonPaneSettings>
          <DxBorder :visible="true" :width="2" :top="false" :right="false" />
        </DxCommonPaneSettings>
        <DxSeries argument-field="cas" value-field="teplotaVonkajsia" type="spline" color="#1D46F5" />
        <DxLegend :visible="false" />
        <DxTooltip
          :enabled="true"
          :customize-tooltip="
            ({ valueText }) => ({
              text: `${toFloatNumber(valueText, 2)}${'&#176;C'}`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
  </div>
</template>

<style>
.action {
  width: 270px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dx-icon.dx-icon-xlsxfile::before {
  content: '\f05f';
}
</style>
