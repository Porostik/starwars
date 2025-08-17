import { test } from '@playwright/test';

const makePerson = (id: number, q = '') => {
  const n = (base: number, mod: number) => String(base + (id % mod));
  const name = `${q ? q + ' ' : ''}Person ${id}`;
  return {
    name,
    height: n(160, 40),
    mass: n(60, 30),
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: `/api/planets/${(id % 10) + 1}`,
    films: [1, 2].map((f) => `/api/films/${f}`),
    species: [],
    vehicles: [],
    starships: [],
    created: new Date().toISOString(),
    edited: new Date().toISOString(),
    url: `/api/people/${id}/`
  };
};

const makePage = (page: number, q = '') => {
  const startId = (page - 1) * 10 + 1;
  return {
    count: 42,
    results: Array.from({ length: 10 }, (_, i) => makePerson(startId + i, q))
  };
};

test.beforeEach(async ({ page }) => {
  const API = '**/api';

  await page.route(`${API}/people?*`, async (route) => {
    const url = new URL(route.request().url());
    const pageNum = Number(url.searchParams.get('page') ?? '1');
    const q = url.searchParams.get('search') ?? '';
    await route.fulfill({ json: makePage(pageNum, q), status: 200, contentType: 'application/json' });
  });

  await page.route(`${API}/people/*`, async (route) => {
    const id = Number(/people\/(\d+)/.exec(route.request().url())?.[1] ?? '1');
    await route.fulfill({ json: makePerson(id) });
  });

  await page.route(`${API}/planets/*`, async (route) => {
    const id = Number(/planets\/(\d+)/.exec(route.request().url())?.[1] ?? '1');
    await route.fulfill({ json: { name: `Planet ${id}`, url: `/planets/${id}/` } });
  });

  await page.route(`${API}/films/*`, async (route) => {
    const id = Number(/films\/(\d+)/.exec(route.request().url())?.[1] ?? '1');
    await route.fulfill({ json: { title: `Film ${id}`, url: `/api/films/${id}/` } });
  });
});
