<script setup>
import 'devextreme/data/odata/store';
import DxChart, { DxValueAxis, DxArgumentAxis, DxCommonPaneSettings, DxGrid, DxSeries, DxLegend, DxSize, DxBorder, DxLabel, DxTooltip, DxExport, DxLoadingIndicator } from 'devextreme-vue/chart';

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
    state.dataSource = Object.keys(data).map((key, idx) => ({
      id: idx,
      ...{
        ...data[key],
        energiaVyrobena1: data[key].energiaVyrobena1 * 10,
        energiaVyrobena2: data[key].energiaVyrobena2 * 10,
        energiaVyrobenaCelkovo: data[key].energiaVyrobenaCelkovo * 10,
      },
    }));
    console.log(state.dataSource);
  } else {
    console.log('No data available');
  }
});
</script>

<template>
  <div>
    <h2 class="content-block">Grafy</h2>
    <div class="content-block">
      <DxChart :data-source="state.dataSource" :title="'Energia celkovo'">
        <DxSize :height="420" />
        <DxValueAxis :grid="{ opacity: 0.2 }" value-type="numeric">
          <DxLabel :customize-text="({ valueText }) => `${valueText} GJ`" />
        </DxValueAxis>
        <DxArgumentAxis type="discrete">
          <DxGrid :visible="true" :opacity="0.5" />
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
              text: `${valueText} GJ`,
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
              text: `${valueText} kW/h`,
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
              text: `${valueText} kW/h`,
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
              text: `${valueText} kW/h`,
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
              text: `${valueText}${'&#176;C'}`,
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
