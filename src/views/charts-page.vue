<script setup>
import 'devextreme/data/odata/store';
import DxChart, { DxValueAxis, DxArgumentAxis, DxCommonPaneSettings, DxGrid, DxSeries, DxLegend, DxSize, DxBorder, DxLabel, DxTooltip, DxExport, DxLoadingIndicator } from 'devextreme-vue/chart';
import DxDateBox from 'devextreme-vue/date-box';

import { reactive, watch } from 'vue';
import { actualDate, toFloatNumber } from '@/utils/helpers';
import store from '@/store';

const state = reactive({
  dataSource: processDataSource(store.dataSource),
});

watch(
  () => store.dataSource,
  (dataSource) => {
    state.dataSource = processDataSource(dataSource);
  }
);

function processDataSource(dataSource) {
  const newData = dataSource.map((x) => ({ ...x }));

  newData.forEach((record, idx) => {
    if (!idx) {
      if (record.energiaVyrobena1 <= 0) {
        record.energiaVyrobena1 = undefined;
        record.energiaVyrobenaCelkovo = undefined;
      }
      if (record.energiaVyrobena2 <= 0) {
        record.energiaVyrobena2 = undefined;
        record.energiaVyrobenaCelkovo = undefined;
      }
    }
    if (idx) {
      for (var i = idx - 1; newData[i].energiaVyrobenaCelkovo === undefined && i > 0; i--);

      if (record.energiaVyrobena1 < newData[i].energiaVyrobena1) {
        record.energiaVyrobena1 = undefined;
      }
      if (record.energiaVyrobena2 < newData[i].energiaVyrobena2) {
        record.energiaVyrobena2 = undefined;
      }
      if (record.energiaVyrobenaCelkovo < newData[i].energiaVyrobenaCelkovo) {
        record.energiaVyrobenaCelkovo = undefined;
      }
    }
    if (record.teplotaVonkajsia > 100) {
      record.teplotaVonkajsia = undefined;
    }
  });

  return newData;
}

const customizeTimeAxisLabel = ({ valueText }) => new Date(valueText).toLocaleTimeString('sk-SK').split(':').slice(0, 2).join(':');
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
          <DxDateBox v-model="store.selectedDate" date-serialization-format="yyyy-MM-dd" :input-attr="{ 'aria-label': 'Date' }" type="date" :max="actualDate" />
        </div>
      </div>
    </div>

    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia celkovo'">
        <!-- :common-series-settings="{ point: { visible: false } }" -->
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} (kW/h)`" />
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
              text: `${toFloatNumber(valueText, 2)} (kW/h)`,
            })
          "
        />
        <DxExport :enabled="true" />
        <DxLoadingIndicator :enabled="true" />
      </DxChart>
    </div>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Spotreba energie 1'">
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
      <DxChart :data-source="state.dataSource" :title="'Spotreba energie 2'">
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
      <DxChart :data-source="state.dataSource" :title="'Spotreba energie spolu'">
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
