export interface Account {
  iban: string;
  label: string;
  balance: number;
}

export interface AccountSummary {
  id: string;
  owner: string;
  balance: number;
  area: 'private' | 'business';
  accounts: Account[];
}

// ──────────────────────────────────────────────
// Mock data — usati dal repository per simulare
// le risposte HTTP (con delay(300) per rendere
// visibile il caricamento).
// ──────────────────────────────────────────────

export const MOCK_PRIVATE_SUMMARY: AccountSummary = {
  id: 'P-001',
  owner: 'Mario Rossi',
  balance: 12_500.00,
  area: 'private',
  accounts: [
    {
      iban: 'IT60 X054 2811 1010 0000 0123 456',
      label: 'Conto Corrente',
      balance: 8_500.00,
    },
    {
      iban: 'IT60 X054 2811 1010 0000 0654 321',
      label: 'Conto Risparmio',
      balance: 4_000.00,
    },
  ],
};

export const MOCK_BUSINESS_SUMMARY: AccountSummary = {
  id: 'B-001',
  owner: 'Lipari SRL',
  balance: 85_000.00,
  area: 'business',
  accounts: [
    {
      iban: 'IT60 X054 2811 1010 0000 0999 888',
      label: 'Conto Business',
      balance: 65_000.00,
    },
    {
      iban: 'IT60 X054 2811 1010 0000 0777 666',
      label: 'Conto IVA',
      balance: 20_000.00,
    },
  ],
};
