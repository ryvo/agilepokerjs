import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const initialState = { isVisible: false };
  const [popupStates, setPopupStates] = useState(initialState);

  const getPopupState = (popupId) => {
    return popupStates[popupId];
  }

  const openPopup = (popupId, popupOptions, customData, onConfirm) => {
    setPopupStates({
      ...popupStates,
      [popupId] : {
        isVisible: true,
        options: popupOptions,
        data: customData,
        onConfirm,
      }
    });
  }

  const setLoading = (popupId) => {
    const popupState = getPopupState(popupId);
    setPopupStates({
      ...popupStates,
      [popupId] : {
        ...popupState,
        isLoading: true,
      },
    });
  }

  const closePopup = (popupId) => {
    setPopupStates({
      ...popupStates,
      [popupId]: initialState
    });
  }

  const confirmAndClosePopup = (popupId, data) => {
    const onConfirm = popupStates[popupId].onConfirm;
    if (onConfirm === undefined || typeof onConfirm !== 'function') {
      closePopup(popupId);
      return;
    }
    const result = onConfirm(data);
    if (result instanceof Promise) {
      setLoading(popupId, true);
      result.then(() => {
        closePopup(popupId);
      })
      return;
    }
    closePopup(popupId);
  };

  return (
    <PopupContext.Provider value={{ getPopupState, openPopup, closePopup, confirmAndClosePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
