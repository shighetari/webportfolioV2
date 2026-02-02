import { useState, useEffect, useCallback, useRef } from 'react';

interface ChatbotDimensions {
  width: number;
  height: number;
}

interface ChatbotPosition {
  bottom: number;
  right: number;
}

interface ResizeHandle {
  type: 'top' | 'left' | 'corner';
}

const STORAGE_KEY = 'chatbot-preferences';
const DEFAULT_SIZE: ChatbotDimensions = { width: 500, height: 600 };
const MIN_SIZE: ChatbotDimensions = { width: 380, height: 500 };
const MAX_SIZE: ChatbotDimensions = { width: 600, height: 800 };
const SIZE_PRESETS = {
  compact: { width: 380, height: 500 },
  default: { width: 500, height: 600 },
  large: { width: 600, height: 700 },
};

export const useResizableChatbot = () => {
  const [dimensions, setDimensions] = useState<ChatbotDimensions>(DEFAULT_SIZE);
  const [position, setPosition] = useState<ChatbotPosition>({ bottom: 90, right: 20 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; bottom: number; right: number } | null>(null);
  const activeHandleRef = useRef<ResizeHandle['type'] | null>(null);

  // Load saved preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { dimensions: savedDimensions, position: savedPosition } = JSON.parse(saved);
        if (savedDimensions) setDimensions(savedDimensions);
        if (savedPosition) setPosition(savedPosition);
      } catch (e) {
        console.error('Failed to load chatbot preferences:', e);
      }
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ dimensions, position }));
  }, [dimensions, position]);

  // Constrain dimensions to min/max
  const constrainDimensions = useCallback((dims: ChatbotDimensions): ChatbotDimensions => {
    const maxHeight = Math.min(MAX_SIZE.height, window.innerHeight - 120);
    return {
      width: Math.max(MIN_SIZE.width, Math.min(MAX_SIZE.width, dims.width)),
      height: Math.max(MIN_SIZE.height, Math.min(maxHeight, dims.height)),
    };
  }, []);

  // Constrain position to viewport
  const constrainPosition = useCallback((pos: ChatbotPosition, dims: ChatbotDimensions): ChatbotPosition => {
    const minMargin = 20;
    return {
      bottom: Math.max(minMargin, Math.min(window.innerHeight - dims.height - minMargin, pos.bottom)),
      right: Math.max(minMargin, Math.min(window.innerWidth - dims.width - minMargin, pos.right)),
    };
  }, []);

  // Start resize
  const handleResizeStart = useCallback((e: React.MouseEvent, handleType: ResizeHandle['type']) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);
    activeHandleRef.current = handleType;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: dimensions.width,
      height: dimensions.height,
    };
  }, [dimensions]);

  // Handle resize movement
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeStartRef.current || !activeHandleRef.current) return;

    const deltaX = resizeStartRef.current.x - e.clientX;
    const deltaY = resizeStartRef.current.y - e.clientY;

    let newWidth = dimensions.width;
    let newHeight = dimensions.height;

    switch (activeHandleRef.current) {
      case 'top':
        newHeight = resizeStartRef.current.height + deltaY;
        break;
      case 'left':
        newWidth = resizeStartRef.current.width + deltaX;
        break;
      case 'corner':
        newWidth = resizeStartRef.current.width + deltaX;
        newHeight = resizeStartRef.current.height + deltaY;
        break;
    }

    const constrainedDims = constrainDimensions({ width: newWidth, height: newHeight });
    setDimensions(constrainedDims);
  }, [isResizing, dimensions, constrainDimensions]);

  // End resize
  const handleResizeEnd = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      activeHandleRef.current = null;
      resizeStartRef.current = null;
      savePreferences();
    }
  }, [isResizing, savePreferences]);

  // Start drag
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    // Only allow dragging from header, not from other elements
    if ((e.target as HTMLElement).closest('button, textarea, input')) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      bottom: position.bottom,
      right: position.right,
    };
  }, [position]);

  // Handle drag movement
  const handleDragMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;

    const deltaX = dragStartRef.current.x - e.clientX;
    const deltaY = dragStartRef.current.y - e.clientY; // Fixed: inverted to match expected behavior

    const newPosition = {
      bottom: dragStartRef.current.bottom + deltaY,
      right: dragStartRef.current.right + deltaX,
    };

    const constrainedPos = constrainPosition(newPosition, dimensions);
    setPosition(constrainedPos);
  }, [isDragging, dimensions, constrainPosition]);

  // End drag
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      dragStartRef.current = null;
      savePreferences();
    }
  }, [isDragging, savePreferences]);

  // Set size preset
  const setSizePreset = useCallback((preset: keyof typeof SIZE_PRESETS) => {
    const newDimensions = SIZE_PRESETS[preset];
    setDimensions(newDimensions);
    savePreferences();
  }, [savePreferences]);

  // Reset to default
  const resetToDefault = useCallback(() => {
    setDimensions(DEFAULT_SIZE);
    setPosition({ bottom: 90, right: 20 });
    savePreferences();
  }, [savePreferences]);

  // Global mouse event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Handle window resize - reposition if necessary
  useEffect(() => {
    const handleWindowResize = () => {
      setPosition(prev => constrainPosition(prev, dimensions));
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [dimensions, constrainPosition]);

  return {
    dimensions,
    position,
    isResizing,
    isDragging,
    handleResizeStart,
    handleDragStart,
    setSizePreset,
    resetToDefault,
  };
};
