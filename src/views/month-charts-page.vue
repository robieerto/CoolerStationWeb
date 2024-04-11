<script setup>
import 'devextreme/data/odata/store';
import DxChart, { DxValueAxis, DxArgumentAxis, DxCommonPaneSettings, DxGrid, DxSeries, DxLegend, DxSize, DxBorder, DxLabel, DxTooltip, DxExport, DxLoadingIndicator } from 'devextreme-vue/chart';
import DxSelectBox from 'devextreme-vue/select-box';
import { DxLoadPanel } from 'devextreme-vue/load-panel';

import { reactive, watch } from 'vue';
import { months, years, toFloatNumber } from '@/utils/helpers';
import store, { initDailyData } from '@/store';

const state = reactive({
  dataSource: store.dailyDataSource,
});

initDailyData();

watch(
  () => store.dailyDataSource,
  (dataSource) => {
    state.dataSource = dataSource;
  }
);

const customizeTimeAxisLabel = ({ valueText }) => new Date(valueText).toLocaleDateString('sk-SK');
</script>

<template>
  <div>
    <div class="content-block mt-0">
      <div class="col-sm-auto">
        <div>
          <h2>Grafy</h2>
        </div>
      </div>
      <div class="d-flex mt-3 mb-3">
        <div class="col-sm-3 me-2">
          <div>
            <DxSelectBox v-model="store.selectedMonth" :items="months" />
          </div>
        </div>
        <div class="col-sm-3">
          <div>
            <DxSelectBox v-model="store.selectedYear" :items="years" />
          </div>
        </div>
      </div>
    </div>

    <DxLoadPanel v-model:visible="store.loading" />

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
  </div>
</template>
