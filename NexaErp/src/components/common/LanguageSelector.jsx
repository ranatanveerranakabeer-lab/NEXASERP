import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CHeaderNav,
  CNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLanguage, cilCheckAlt } from '@coreui/icons';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  // RTL aur Language persistence handle karne ke liye
  useEffect(() => {
    const currentLng = i18n.language || 'en';
    document.body.dir = (currentLng === 'ur' || currentLng === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLng;
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'ur', name: 'اردو', flag: 'PK' },
    { code: 'ar', name: 'العربية', flag: 'SA' },
  ];

  const currentLanguage = languages.find(l => l.code === (i18n.language || 'en'));

  return (
    <CHeaderNav className="ms-3 me-3">
      <CDropdown variant="nav-item" alignment="end">
        <CDropdownToggle caret={false} className="py-0 d-flex align-items-center" variant="nav-link">
          {/* Professional Language Icon */}
          <div className="bg-light p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm border">
            <CIcon icon={cilLanguage} size="lg" className="text-primary" />
          </div>
          <span className="ms-2 d-none d-md-inline fw-semibold text-secondary">
            {currentLanguage?.name}
          </span>
        </CDropdownToggle>
        
        <CDropdownMenu className="pt-0 shadow-lg border-0 mt-2" style={{ minWidth: '160px' }}>
          <div className="dropdown-header bg-light py-2 fw-bold">Select Language</div>
          
          {languages.map((lang) => (
            <CDropdownItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="d-flex align-items-center justify-content-between py-2"
              style={{ cursor: 'pointer', fontWeight: i18n.language === lang.code ? '600' : '400' }}
            >
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <CIcon icon={cilCheckAlt} className="text-success" size="sm" />
              )}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </CHeaderNav>
  );
};

export default LanguageSelector;