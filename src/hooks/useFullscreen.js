import { useState, useEffect } from 'react';

/**
 * A custom hook that provides fullscreen functionality with cross-browser support.
 * 
 * @param {HTMLElement | null} [element=null] - The element to make fullscreen. If not provided,
 *                                              defaults to document.documentElement
 * @returns {Object} An object containing the following:
 * @returns {boolean} isFullscreen - Whether the element is currently in fullscreen mode
 * @returns {(targetElement?: HTMLElement) => Promise<void>} enterFullscreen - Function to enter fullscreen mode
 * @returns {() => Promise<void>} exitFullscreen - Function to exit fullscreen mode
 * @returns {(targetElement?: HTMLElement) => Promise<void>} toggleFullscreen - Function to toggle fullscreen mode
 */
const useFullscreen = (element = null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const enterFullscreen = async (targetElement) => {
    try {
      const elem = targetElement || element || document.documentElement;
      
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        await elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to enter fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to exit fullscreen:', error);
    }
  };

  const toggleFullscreen = async (targetElement) => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen(targetElement);
    }
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen
  };
};

export default useFullscreen;