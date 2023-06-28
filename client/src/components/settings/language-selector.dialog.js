import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Radio, Dialog, DialogContent, DialogTitle, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { languages } from 'i18n/languages';
import useLocalStorage from 'hooks/use-local-storage';
const LanguageSelectorDialog = ({ open, onClose }) => {
    const localStorageLanguage = useLocalStorage('lng');
    const { i18n } = useTranslation();
    const handleChangeLanguage = (language) => (event) => {
        i18n.changeLanguage(language);
        localStorageLanguage.set(language);
        onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose },
        React.createElement(DialogTitle, null, "Choose a language"),
        React.createElement(DialogContent, null,
            React.createElement(List, { dense: true }, languages.map(language => (React.createElement(ListItem, { key: language.code, disablePadding: true },
                React.createElement(ListItemButton, { onClick: handleChangeLanguage(language.code), sx: { p: 0 } },
                    React.createElement(Radio, { checked: i18n.language === language.code }),
                    React.createElement(ListItemText, { primary: `${language.flag} ${language.name}` })))))))));
};
export default LanguageSelectorDialog;
