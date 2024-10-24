<template>
  <div class="view-pdf">
    <VuePDF v-if="pdfDoc" :pdf="pdfDoc" :page='1' :scale="0.8" text-layer annotation-layer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import '@tato30/vue-pdf/style.css';

const route = useRoute();
const pdfDoc = ref(null);

const pdfList = [
  { id: 1, name: 'PDF 1', url: '/pdfs/1.pdf' },
  { id: 2, name: 'PDF 2', url: '/pdfs/2.pdf' },
];

onMounted(async () => {
  const id = parseInt(route.params.id);
  console.log(id);
  
  if (id) {
    const foundPdf = pdfList.find(p => p.id === id) || null;
      try {
        const {pdf: pdfDoc} = await usePDF(foundPdf.url);
        console.log('Loaded PDF:', pdfDoc); 
      } catch (error) {
        console.error('Error loading PDF:', error); 

      }
    }
});
</script>

<style>
.view-pdf {
  display: flex;
}
.pdf-view {
  flex: 1;
  padding: 20px;
}
.sidebar {
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
  flex-shrink: 0;
}
</style>
