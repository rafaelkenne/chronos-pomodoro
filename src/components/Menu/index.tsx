import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // return () => {
    //   console.log('Este componente será atualizado');
    // };
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <Link to='/' className={styles.menuLink} aria-label='Ir para a Home' title='Ir para a Home'>
        <HouseIcon />
      </Link>
      <a href='#' className={styles.menuLink} aria-label='Ver histórico' title='Ver histórico'>
        <HistoryIcon />
      </a>
      <a href='#' className={styles.menuLink} aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </a>
      <a href='#' className={styles.menuLink} aria-label='Mudar tema' title='Mudar tema' onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
