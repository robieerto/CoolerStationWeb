<script setup>
import { reactive } from 'vue';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebase';
import { toFloatNumber, toDate } from '@/utils/helpers';

const stateTemplate = {
  data: {
    cas: null,
    energiaAktualna: null,
    energiaCelkovo: null,
    energiaVyrobena1: null,
    energiaVyrobena2: null,
    energiaVyrobenaCelkovo: null,
    teplotaVonkajsia: null,
    teplotaVstupna: null,
    teplotaVystupna: null,
    vykonCinny1: null,
    vykonCinny2: null,
  },
};

const state = reactive(stateTemplate);

const dbRef = ref(db, 'ESPData/ESP32-6413A8E350CC/ActualData');
onValue(dbRef, (snapshot) => {
  if (snapshot.exists()) {
    state.data = snapshot.val();
    state.data.energiaAktualna = state.data.energiaAktualna * 277.778;
    state.data.energiaCelkovo = state.data.energiaCelkovo * 277.778;
    state.data.energiaVyrobena1 = state.data.energiaVyrobena1 * 10;
    state.data.energiaVyrobena2 = state.data.energiaVyrobena2 * 10;
    state.data.energiaVyrobenaCelkovo = state.data.energiaVyrobenaCelkovo * 10;
  } else {
    console.log('No data available');
  }
});
</script>

<template>
  <div>
    <h2 class="content-block">Aktuálne dáta</h2>
    <div class="content-block">
      <div class="row">
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Čas vyčítania</h5>
              <p class="card-text fw-bold fs-3">{{ toDate(state.data.cas) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia aktuálna (kW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.energiaAktualna, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Energia celkovo (kW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.energiaCelkovo, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Spotreba energie 1 (kW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.energiaVyrobena1, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Spotreba energie 2 (kW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.energiaVyrobena2, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Spotreba energie spolu (kW/h)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.energiaVyrobenaCelkovo, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota vonkajšia (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.teplotaVonkajsia, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota vstupná (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.teplotaVstupna, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Teplota výstupná (°C)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.teplotaVystupna, 2) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Výkon činný 1 (kW)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.vykonCinny1, 3) }}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">Výkon činný 2 (kW)</h5>
              <p class="card-text fw-bold fs-3">{{ toFloatNumber(state.data.vykonCinny2, 3) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
