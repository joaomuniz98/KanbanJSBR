import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/kanban.js',  // Caminho do arquivo de entrada da biblioteca
      name: 'Kanban',             // Nome da variável global quando carregada via script
      fileName: (format) => `kanban.${format}.js`, // Nome do arquivo gerado
    },
    rollupOptions: {
      // Certifique-se de que o Vite não tente empacotar dependências externas
      external: [],  // Não inclua dependências externas
    },
  },
});
