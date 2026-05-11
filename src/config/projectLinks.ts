export type ProjectLink = {
  title: string;
  url: string;
  description: string;
};

export const projectLinks: ProjectLink[] = [
  {
    title: 'docs.analitex.ru',
    url: 'https://docs.analitex.ru',
    description: 'Документация проекта (текущий проект)',
  },
  {
    title: 'analitex.ru',
    url: 'https://analitex.ru',
    description: 'Публичный сайт Analitex',
  },
  {
    title: 'app.analitex.ru',
    url: 'https://app.analitex.ru',
    description: 'Рабочее приложение',
  },
];
