import React from 'react';
import './LoadingOverlay.css'; // Importe o arquivo CSS

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingOverlay;

// Para usar o componente, importe no componente pai e passe o estado isLoading como prop: 
// import React, { useState, useEffect } from 'react';
// import LoadingOverlay from './components/LoadingOverlay';

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simula um tempo de carregamento
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//   }, []);

//   return (
//     <div>
//       <LoadingOverlay isLoading={isLoading} />
//       {/* Resto do seu conteúdo aqui */}
//       <h1>Conteúdo Principal</h1>
//     </div>
//   );
// };

// export default App;