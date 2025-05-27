import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styles/BingoAnimation.css';

// Definimos la interfaz de las props del componente.
// Ahora recibirá un booleano para controlar su visibilidad.
interface BingoAnimationProps {
  isVisible: boolean; // Esta prop controlará cuándo se muestra la animación
  onAnimationEnd?: () => void; // Opcional: callback cuando la animación termina
}

const confettiColors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
const NUM_CONFETTI = 100;
const ANIMATION_DURATION_MS = 4000; // Duración total de la animación en milisegundos

const BingoAnimation: React.FC<BingoAnimationProps> = ({
  isVisible,
  onAnimationEnd,
}) => {
  const [internalShowAnimation, setInternalShowAnimation] = useState(false);
  const confettiContainerRef = useRef<HTMLDivElement>(null);
  const bingoTextRef = useRef<HTMLHeadingElement>(null);

  // Función para crear una pieza de confeti
  const createConfetti = useCallback(() => {
    if (!confettiContainerRef.current) return;

    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.classList.add(
      confettiColors[Math.floor(Math.random() * confettiColors.length)]
    );

    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `${-20 - Math.random() * 50}px`;

    const size = `${8 + Math.random() * 10}px`;
    confetti.style.width = size;
    confetti.style.height = size;

    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 1.5;
    confetti.style.animation = `confetti-fall ${duration}s ${delay}s forwards`;

    confettiContainerRef.current.appendChild(confetti);

    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }, []); // Dependencias vacías

  // useEffect para observar la prop 'isVisible' y activar/desactivar la animación
  useEffect(() => {
    if (isVisible) {
      setInternalShowAnimation(true);

      // Reiniciar animación del texto BINGO!
      if (bingoTextRef.current) {
        bingoTextRef.current.style.animation = 'none';
        void bingoTextRef.current.offsetHeight; // Forzar reflow
        bingoTextRef.current.style.animation = ''; // Reactivar
      }

      // Limpiar confeti anterior
      if (confettiContainerRef.current) {
        confettiContainerRef.current.innerHTML = '';
      }

      // Generar confeti
      for (let i = 0; i < NUM_CONFETTI; i++) {
        createConfetti();
      }

      // Ocultar animación después de un tiempo y llamar al callback
      const timer = setTimeout(() => {
        setInternalShowAnimation(false);
        // Limpiar confeti de nuevo en caso de que alguno siguiera cayendo
        setTimeout(() => {
          if (confettiContainerRef.current) {
            confettiContainerRef.current.innerHTML = '';
          }
          onAnimationEnd?.(); // Llamar al callback de finalización
        }, 500); // Pequeño retraso para asegurar limpieza
      }, ANIMATION_DURATION_MS);

      // Función de limpieza para useEffect: se ejecuta cuando el componente se desmonta
      // o antes de que el efecto se vuelva a ejecutar (si las dependencias cambian)
      return () => {
        clearTimeout(timer);
        if (confettiContainerRef.current) {
          confettiContainerRef.current.innerHTML = ''; // Limpiar si se desmonta
        }
      };
    } else {
      // Si isVisible es false, asegura que la animación esté oculta y limpia
      setInternalShowAnimation(false);
      if (confettiContainerRef.current) {
        confettiContainerRef.current.innerHTML = '';
      }
    }
  }, [isVisible, createConfetti, onAnimationEnd]); // Dependencias de useEffect

  return (
    <div
      className={`animation-container ${internalShowAnimation ? 'show' : ''}`}
    >
      <h1 className="bingo-text" ref={bingoTextRef}>
        ¡BINGO!
      </h1>
      <div className="confetti-container" ref={confettiContainerRef}></div>
    </div>
  );
};

export default BingoAnimation;
