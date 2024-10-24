<!-- ListPdf.vue -->
<template>
  <div>
    <h1>Danh sách bản vẽ PDF</h1>
    <div class="pdf-list">
      <div v-for="pdf in pdfDataList" :key="pdf.id" class="pdf-item" @click="viewPdf(pdf)">
        <div class="pdf-container">
          <VuePDF v-if="pdf.pdf" :pdf="pdf.pdf"  text-layer annotation-layer />
        </div>
        <p>{{ pdf.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import { useRouter } from 'vue-router'; // Import useRouter for navigation
import '@tato30/vue-pdf/style.css';

const pdfList = [
  { id: 1, name: 'Bản vẽ 1', url: '/pdfs/1.pdf' },
  { id: 2, name: 'Bản vẽ 2', url: '/pdfs/2.pdf' },
  { id: 3, name: 'Bản vẽ 3', url: '/pdfs/3.pdf' },
  { id: 4, name: 'Bản vẽ 4', url: '/pdfs/4.pdf' },
];

const pdfDataList = ref([]);
const router = useRouter(); 

onMounted(async () => {
  pdfDataList.value = await Promise.all(
    pdfList.map(async (pdf) => {
      const { pdf: pdfDoc } = await usePDF(pdf.url);
      return { ...pdf, pdf: pdfDoc };
    })
  );
});

const viewPdf = (pdf) => {
  router.push({ name: 'ViewPdf', params: { id: pdf.id } }); 
};
</script>

<style>
.pdf-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.pdf-item {
  display: block;
  width: 400px;
  height: auto;
  text-align: center;
}

.pdf-container {
  width: 400px; 
  height: 400px; 
  overflow: hidden;
  border: 1px solid #ccc; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  transition: transform 1s ease;
}

.pdf-container:hover {
  cursor: pointer;
  transform: scale(1.2);
}
</style>
